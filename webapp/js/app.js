/**
 * Main Application Logic for MCMI-II Assessment Tool
 */

import AssessmentEngine from './assessment-engine.js';
import FileDownloader from './file-downloader.js';

class App {
  constructor() {
    this.engine = new AssessmentEngine();
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.theme = localStorage.getItem('theme') || 'light';
    
    this.init();
  }

  async init() {
    // Set initial theme
    document.documentElement.setAttribute('data-theme', this.theme);
    this.updateThemeIcon();
    
    // Load questions
    await this.loadQuestions();
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Register service worker for PWA
    this.registerServiceWorker();
    
    // Set year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
  }

  async loadQuestions() {
    try {
      const response = await fetch('data/questions.json');
      const data = await response.json();
      this.questions = data.questions;
      console.log(`✅ Loaded ${this.questions.length} questions`);
    } catch (error) {
      console.error('❌ Failed to load questions:', error);
      alert('Failed to load assessment questions. Please refresh the page.');
    }
  }

  setupEventListeners() {
    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', () => {
      this.toggleTheme();
    });

    // Demographic form submission
    document.getElementById('demographic-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.startAssessment();
    });

    // Navigation buttons
    document.getElementById('prev-btn').addEventListener('click', () => {
      this.previousQuestion();
    });

    document.getElementById('next-btn').addEventListener('click', () => {
      this.nextQuestion();
    });

    document.getElementById('submit-btn').addEventListener('click', () => {
      this.submitAssessment();
    });

    // Answer selection
    document.getElementById('answer-options').addEventListener('change', (e) => {
      if (e.target.name === 'answer') {
        this.recordAnswer(e.target.value);
      }
    });

    // Results actions
    document.getElementById('download-report-btn').addEventListener('click', () => {
      this.downloadReport();
    });

    document.getElementById('restart-btn').addEventListener('click', () => {
      this.restartAssessment();
    });
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('theme', this.theme);
    this.updateThemeIcon();
  }

  updateThemeIcon() {
    const icon = document.querySelector('.theme-icon');
    icon.textContent = this.theme === 'light' ? '🌙' : '☀️';
  }

  startAssessment() {
    // Get demographic data
    const demographics = {
      name: document.getElementById('patient-name').value,
      age: document.getElementById('patient-age').value,
      code: document.getElementById('patient-code').value,
      gender: document.querySelector('input[name="gender"]:checked').value
    };
    
    this.engine.setDemographics(demographics);
    
    // Show assessment screen
    this.showScreen('assessment-screen');
    
    // Load first question
    this.currentQuestionIndex = 0;
    this.loadQuestion(this.currentQuestionIndex);
  }

  loadQuestion(index) {
    if (index < 0 || index >= this.questions.length) {
      return;
    }

    const question = this.questions[index];
    
    // Update question text
    document.getElementById('question-text').textContent = question.text;
    document.getElementById('current-q').textContent = index + 1;
    
    // Update progress
    const progress = ((index + 1) / this.questions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `${index + 1} of ${this.questions.length}`;
    
    // Clear previous answer selection
    const radios = document.querySelectorAll('input[name="answer"]');
    radios.forEach(radio => radio.checked = false);
    
    // Check if this question was previously answered
    const previousAnswer = this.engine.getAnswer(question.id);
    if (previousAnswer) {
      const radio = document.querySelector(`input[name="answer"][value="${previousAnswer}"]`);
      if (radio) radio.checked = true;
    }
    
    // Update navigation buttons
    document.getElementById('prev-btn').disabled = index === 0;
    
    // Show submit button on last question
    if (index === this.questions.length - 1) {
      document.getElementById('next-btn').style.display = 'none';
      document.getElementById('submit-btn').style.display = 'block';
    } else {
      document.getElementById('next-btn').style.display = 'block';
      document.getElementById('submit-btn').style.display = 'none';
    }
  }

  recordAnswer(value) {
    const question = this.questions[this.currentQuestionIndex];
    this.engine.recordAnswer(question.id, value);
    console.log(`📝 Question ${question.id}: ${value}`);
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.loadQuestion(this.currentQuestionIndex);
    }
  }

  nextQuestion() {
    // Check if current question is answered
    const question = this.questions[this.currentQuestionIndex];
    const answer = this.engine.getAnswer(question.id);
    
    if (!answer) {
      alert('Please select an answer before continuing.');
      return;
    }

    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.loadQuestion(this.currentQuestionIndex);
    }
  }

  submitAssessment() {
    // Check if all questions are answered
    if (!this.engine.isComplete(this.questions.length)) {
      const unanswered = this.questions.length - Object.keys(this.engine.answers).length;
      alert(`Please answer all questions. ${unanswered} question(s) remaining.`);
      return;
    }

    // Calculate results
    const results = this.engine.getResults();
    
    // Display results
    this.displayResults(results);
    
    // Show results screen
    this.showScreen('results-screen');
  }

  displayResults(results) {
    const summary = document.getElementById('results-summary');
    
    const html = `
      <h3>📊 Assessment Summary</h3>
      <p><strong>Name:</strong> ${results.name}</p>
      <p><strong>Age:</strong> ${results.age}</p>
      <p><strong>Gender:</strong> ${results.gender}</p>
      <p><strong>Questions Answered:</strong> ${results.totalQuestions} / 175</p>
      <p><strong>Completed:</strong> ${new Date(results.completedAt).toLocaleString()}</p>
      
      <div style="margin-top: 20px; padding: 15px; background: var(--bg-primary); border-radius: 8px;">
        <h4 style="color: var(--primary-color); margin-bottom: 10px;">📈 Top Clinical Scales</h4>
        ${results.scores
          .filter(s => !['V', 'X', 'Y', 'Z', '1'].includes(s.code))
          .sort((a, b) => b.value - a.value)
          .slice(0, 5)
          .map((s, i) => `<p>${i + 1}. <strong>${s.name}</strong>: ${s.value}</p>`)
          .join('')}
      </div>
    `;
    
    summary.innerHTML = html;
    
    // Store results for download
    this.lastResults = results;
  }

  downloadReport() {
    if (!this.lastResults) {
      alert('No results available to download.');
      return;
    }

    const reportHTML = FileDownloader.generateReport(this.lastResults);
    const filename = `mcmi-ii-report-${this.lastResults.name.replace(/\s+/g, '-')}-${Date.now()}`;
    FileDownloader.saveReport(reportHTML, filename);
    
    console.log('✅ Report downloaded successfully!');
  }

  restartAssessment() {
    if (confirm('Are you sure you want to start a new assessment? This will clear all current data.')) {
      this.engine.reset();
      this.currentQuestionIndex = 0;
      this.lastResults = null;
      
      // Reset form
      document.getElementById('demographic-form').reset();
      
      // Show welcome screen
      this.showScreen('welcome-screen');
    }
  }

  showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
      screen.classList.remove('active');
    });
    
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
      targetScreen.classList.add('active');
    }
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js')
        .then(registration => {
          console.log('✅ Service Worker registered:', registration.scope);
        })
        .catch(error => {
          console.log('❌ Service Worker registration failed:', error);
        });
    }
  }

  /**
   * Auto-fill assessment with mock data (for testing)
   */
  autoFillForTesting() {
    console.log('🤖 Auto-filling assessment with mock data...');
    
    // Fill demographics
    document.getElementById('patient-name').value = 'Test Subject';
    document.getElementById('patient-age').value = '35';
    document.getElementById('patient-code').value = 'TEST-001';
    document.querySelector('input[name="gender"][value="male"]').checked = true;
    
    // Start assessment
    this.startAssessment();
    
    // Generate balanced answers
    this.engine.generateMockAnswers(this.questions, 'balanced');
    
    // Jump to last question
    this.currentQuestionIndex = this.questions.length - 1;
    this.loadQuestion(this.currentQuestionIndex);
    
    console.log('✅ Mock data filled. Click Submit to see results.');
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
  });
} else {
  window.app = new App();
}

// Expose auto-fill function to console for testing
window.autoFillTest = () => {
  if (window.app) {
    window.app.autoFillForTesting();
  }
};

console.log('🏥 MCMI-II Assessment Tool loaded');
console.log('💡 Type autoFillTest() in console to quickly test the application');
