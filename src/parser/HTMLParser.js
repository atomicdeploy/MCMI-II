/**
 * HTML Parser for MCMI-II Assessment
 * Extracts questions, form structure, and metadata from the HTML file
 */

import { readFileSync } from 'fs';
import Logger from '../logger/Logger.js';

export class HTMLParser {
  constructor(filePath) {
    this.filePath = filePath;
    this.logger = new Logger('HTMLParser');
    this.questions = [];
    this.metadata = {};
    this.rawHTML = '';
  }

  parse() {
    this.logger.step('Parsing HTML file');
    
    try {
      // Read the HTML file
      this.rawHTML = readFileSync(this.filePath, 'utf-8');
      this.logger.success(`Loaded file: ${this.filePath}`);

      // Extract metadata
      this._extractMetadata();
      
      // Extract questions
      this._extractQuestions();
      
      // Extract form structure
      this._extractFormStructure();

      this.logger.complete('HTML parsing completed');
      
      return {
        questions: this.questions,
        metadata: this.metadata,
        totalQuestions: this.questions.length
      };
    } catch (error) {
      this.logger.error('Failed to parse HTML', error);
      throw error;
    }
  }

  _extractMetadata() {
    this.logger.info('Extracting metadata');
    
    // Extract title
    const titleMatch = this.rawHTML.match(/<TITLE>(.*?)<\/TITLE>/i);
    if (titleMatch) {
      this.metadata.title = titleMatch[1];
    }

    // Extract form name
    const formMatch = this.rawHTML.match(/<FORM\s+name=(\w+)/i);
    if (formMatch) {
      this.metadata.formName = formMatch[1];
    }

    this.metadata.encoding = 'UTF-8';
    this.metadata.originalEncoding = 'UTF-16LE';
    
    this.logger.success('Metadata extracted', this.metadata);
  }

  _extractQuestions() {
    this.logger.info('Extracting questions');
    
    // Extract all radio button names to find question numbers
    const radioPattern = /name=R(\d+)/gi;
    const questionNumbers = new Set();
    let match;
    
    while ((match = radioPattern.exec(this.rawHTML)) !== null) {
      questionNumbers.add(parseInt(match[1]));
    }
    
    this.logger.info(`Found ${questionNumbers.size} unique questions`);
    
    // For each question number, extract the question text
    const sortedNumbers = Array.from(questionNumbers).sort((a, b) => a - b);
    
    for (const qNum of sortedNumbers) {
      // Pattern to find question text near the radio buttons
      // Look for the question number, then the radio buttons, then the text in <B> tags
      const qPattern = new RegExp(
        `name=R${qNum}[\\s\\S]{0,500}<B>([\\s\\S]*?)<\\/B>`,
        'i'
      );
      
      const textMatch = this.rawHTML.match(qPattern);
      let questionText = '';
      
      if (textMatch) {
        questionText = textMatch[1]
          .replace(/<[^>]+>/g, '') // Remove HTML tags
          .replace(/&nbsp;/g, ' ') // Replace nbsp
          .replace(/\s+/g, ' ') // Normalize whitespace
          .trim();
      }
      
      // If we couldn't find text after, try looking before
      if (!questionText) {
        const beforePattern = new RegExp(
          `<B>([\\s\\S]*?)<\\/B>[\\s\\S]{0,500}name=R${qNum}`,
          'i'
        );
        const beforeMatch = this.rawHTML.match(beforePattern);
        if (beforeMatch) {
          questionText = beforeMatch[1]
            .replace(/<[^>]+>/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        }
      }
      
      this.questions.push({
        id: qNum,
        number: qNum,
        text: questionText || `Question ${qNum}`,
        fieldName: `R${qNum}`,
        type: 'radio',
        options: ['false', 'true'],
        labels: ['FALSE - خیر', 'TRUE - بلی']
      });
      
      if (qNum % 25 === 0) {
        this.logger.progress('Extracting questions', qNum, 175);
      }
    }
    
    // Sort questions by number
    this.questions.sort((a, b) => a.number - b.number);
    
    this.logger.success(`Extracted ${this.questions.length} questions`);
  }

  _extractFormStructure() {
    this.logger.info('Extracting form structure');
    
    // Extract demographic fields
    this.metadata.demographicFields = [];
    
    // Gender field
    if (this.rawHTML.includes('radgender')) {
      this.metadata.demographicFields.push({
        name: 'radgender',
        type: 'radio',
        label: 'Gender',
        options: ['female', 'male']
      });
    }
    
    // Age field
    if (this.rawHTML.includes('name=age') || this.rawHTML.includes('id=age')) {
      this.metadata.demographicFields.push({
        name: 'age',
        type: 'number',
        label: 'Age'
      });
    }
    
    // Name field
    if (this.rawHTML.includes('name=name') || this.rawHTML.includes('id=name')) {
      this.metadata.demographicFields.push({
        name: 'name',
        type: 'text',
        label: 'Name'
      });
    }
    
    this.logger.success(`Extracted ${this.metadata.demographicFields.length} demographic fields`);
  }

  getQuestionsJSON() {
    return {
      assessment: 'MCMI-II',
      version: '1.0',
      totalQuestions: this.questions.length,
      metadata: this.metadata,
      questions: this.questions
    };
  }
}

export default HTMLParser;
