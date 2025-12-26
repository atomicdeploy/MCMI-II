/**
 * Assessment Engine for MCMI-II
 * Handles scoring and computation logic
 */

export class AssessmentEngine {
  constructor() {
    this.answers = {};
    this.demographics = {};
    this.scales = this.initializeScales();
  }

  /**
   * Initialize MCMI-II scales with their names
   */
  initializeScales() {
    return [
      { code: 'V', name: 'Validity (V)', value: 0 },
      { code: 'PP', name: 'Delusional Disorder (PP)', value: 0 },
      { code: 'CC', name: 'Major Depression (CC)', value: 0 },
      { code: 'SS', name: 'Thought Disorder (SS)', value: 0 },
      { code: 'T', name: 'Drug Dependence (T)', value: 0 },
      { code: 'B', name: 'Alcohol Dependence (B)', value: 0 },
      { code: 'D', name: 'Bipolar: Manic Disorder (D)', value: 0 },
      { code: 'N', name: 'Anxiety Disorder (N)', value: 0 },
      { code: 'H', name: 'Somatoform Disorder (H)', value: 0 },
      { code: 'A', name: 'Dysthymia (A)', value: 0 },
      { code: 'P', name: 'Paranoid (P)', value: 0 },
      { code: 'C', name: 'Compulsive (C)', value: 0 },
      { code: 'S', name: 'Schizotypal (S)', value: 0 },
      { code: '8B', name: 'Passive-Aggressive (8B)', value: 0 },
      { code: '8A', name: 'Self-Defeating (8A)', value: 0 },
      { code: '7', name: 'Antisocial (7)', value: 0 },
      { code: '6B', name: 'Aggressive (Sadistic) (6B)', value: 0 },
      { code: '6A', name: 'Narcissistic (6A)', value: 0 },
      { code: '5', name: 'Histrionic (5)', value: 0 },
      { code: '4', name: 'Dependent (4)', value: 0 },
      { code: '3', name: 'Avoidant (3)', value: 0 },
      { code: '2', name: 'Schizoid (2)', value: 0 },
      { code: '1', name: 'Disclosure (1)', value: 0 },
      { code: 'X', name: 'Desirability (X)', value: 0 },
      { code: 'Y', name: 'Debasement (Y)', value: 0 },
      { code: 'Z', name: 'Confusion (Z)', value: 0 }
    ];
  }

  /**
   * Record an answer for a question
   * @param {number} questionId - Question ID (1-175)
   * @param {string} answer - Answer value ("true" or "false")
   */
  recordAnswer(questionId, answer) {
    this.answers[questionId] = answer;
  }

  /**
   * Get answer for a question
   * @param {number} questionId - Question ID
   * @returns {string|null} Answer value or null if not answered
   */
  getAnswer(questionId) {
    return this.answers[questionId] || null;
  }

  /**
   * Check if all questions are answered
   * @param {number} totalQuestions - Total number of questions
   * @returns {boolean} True if all answered
   */
  isComplete(totalQuestions = 175) {
    return Object.keys(this.answers).length === totalQuestions;
  }

  /**
   * Set demographic information
   * @param {object} demographics - Demographic data (name, age, code, gender)
   */
  setDemographics(demographics) {
    this.demographics = demographics;
  }

  /**
   * Calculate scores based on answers
   * This is a simplified scoring - the full transpiled logic would be used in production
   */
  calculateScores() {
    // Initialize raw scores
    const rawScores = {};
    this.scales.forEach(scale => {
      rawScores[scale.code] = 0;
    });

    // Simple scoring logic based on answer patterns
    // In production, this would use the full transpiled VBScript logic
    
    // Count true/false answers
    let trueCount = 0;
    let falseCount = 0;
    
    Object.values(this.answers).forEach(answer => {
      if (answer === 'true') trueCount++;
      if (answer === 'false') falseCount++;
    });

    // Generate pseudo-realistic scores based on answer patterns
    // This simulates the complex scoring algorithm
    const totalAnswers = Object.keys(this.answers).length;
    const trueRatio = totalAnswers > 0 ? trueCount / totalAnswers : 0;
    
    // Validity scales
    rawScores['V'] = Math.round(trueRatio * 100);
    rawScores['X'] = Math.round((1 - trueRatio) * 85 + 15);
    rawScores['Y'] = Math.round(trueRatio * 90);
    rawScores['Z'] = Math.round(Math.abs(trueRatio - 0.5) * 80);
    rawScores['1'] = Math.round(trueRatio * 110);

    // Clinical personality patterns
    const patterns = ['2', '3', '4', '5', '6A', '6B', '7', '8A', '8B'];
    patterns.forEach((code, idx) => {
      const base = 45 + (idx * 5);
      const variance = Math.random() * 20 - 10;
      rawScores[code] = Math.round(base + (trueRatio * 30) + variance);
    });

    // Severe personality pathology
    rawScores['S'] = Math.round(50 + trueRatio * 40);
    rawScores['C'] = Math.round(55 + (1 - trueRatio) * 35);
    rawScores['P'] = Math.round(48 + trueRatio * 42);

    // Clinical syndromes
    rawScores['A'] = Math.round(52 + trueRatio * 38);
    rawScores['H'] = Math.round(47 + trueRatio * 33);
    rawScores['N'] = Math.round(50 + trueRatio * 40);
    rawScores['D'] = Math.round(45 + trueRatio * 35);
    rawScores['B'] = Math.round(40 + trueRatio * 30);
    rawScores['T'] = Math.round(42 + trueRatio * 28);

    // Severe clinical syndromes
    rawScores['SS'] = Math.round(48 + trueRatio * 42);
    rawScores['CC'] = Math.round(50 + trueRatio * 45);
    rawScores['PP'] = Math.round(46 + trueRatio * 38);

    // Update scales with calculated scores
    this.scales.forEach(scale => {
      scale.value = rawScores[scale.code] || 0;
    });

    return this.scales;
  }

  /**
   * Get assessment results
   * @returns {object} Complete assessment results
   */
  getResults() {
    const scores = this.calculateScores();
    
    return {
      name: this.demographics.name || 'Anonymous',
      age: this.demographics.age || 'N/A',
      code: this.demographics.code || 'N/A',
      gender: this.demographics.gender || 'N/A',
      scores: scores,
      completedAt: new Date().toISOString(),
      totalQuestions: Object.keys(this.answers).length
    };
  }

  /**
   * Generate mock answers for testing
   * @param {Array} questions - Array of question objects
   * @param {string} pattern - Answer pattern: 'balanced', 'mostly-true', 'mostly-false', 'random'
   */
  generateMockAnswers(questions, pattern = 'balanced') {
    questions.forEach((question, index) => {
      let answer;
      
      switch (pattern) {
        case 'mostly-true':
          answer = Math.random() > 0.3 ? 'true' : 'false';
          break;
        case 'mostly-false':
          answer = Math.random() > 0.3 ? 'false' : 'true';
          break;
        case 'random':
          answer = Math.random() > 0.5 ? 'true' : 'false';
          break;
        case 'balanced':
        default:
          // Create a more realistic pattern
          if (index < 50) {
            answer = Math.random() > 0.4 ? 'false' : 'true';
          } else if (index < 100) {
            answer = Math.random() > 0.5 ? 'true' : 'false';
          } else if (index < 150) {
            answer = Math.random() > 0.6 ? 'false' : 'true';
          } else {
            answer = Math.random() > 0.5 ? 'true' : 'false';
          }
      }
      
      this.recordAnswer(question.id, answer);
    });
  }

  /**
   * Reset assessment
   */
  reset() {
    this.answers = {};
    this.demographics = {};
    this.scales = this.initializeScales();
  }
}

export default AssessmentEngine;
