/**
 * Logger utility with emoji-based status indicators
 * Provides consistent, colorful logging throughout the pipeline
 */

export class Logger {
  constructor(context = 'MCMI-II') {
    this.context = context;
    this.startTime = Date.now();
  }

  info(message, data = null) {
    const timestamp = this._getTimestamp();
    console.log(`ℹ️  [${timestamp}] [${this.context}] ${message}`);
    if (data) console.log(data);
  }

  success(message, data = null) {
    const timestamp = this._getTimestamp();
    console.log(`✅ [${timestamp}] [${this.context}] ${message}`);
    if (data) console.log(data);
  }

  warning(message, data = null) {
    const timestamp = this._getTimestamp();
    console.warn(`⚠️  [${timestamp}] [${this.context}] ${message}`);
    if (data) console.warn(data);
  }

  error(message, error = null) {
    const timestamp = this._getTimestamp();
    console.error(`❌ [${timestamp}] [${this.context}] ${message}`);
    if (error) console.error(error);
  }

  debug(message, data = null) {
    const timestamp = this._getTimestamp();
    console.log(`🔍 [${timestamp}] [${this.context}] ${message}`);
    if (data) console.log(data);
  }

  progress(message, step, total) {
    const timestamp = this._getTimestamp();
    const percentage = Math.round((step / total) * 100);
    console.log(`⏳ [${timestamp}] [${this.context}] ${message} (${step}/${total} - ${percentage}%)`);
  }

  step(stepName) {
    const timestamp = this._getTimestamp();
    console.log(`\n🚀 [${timestamp}] [${this.context}] Starting: ${stepName}`);
  }

  complete(message) {
    const timestamp = this._getTimestamp();
    const elapsed = ((Date.now() - this.startTime) / 1000).toFixed(2);
    console.log(`\n🎉 [${timestamp}] [${this.context}] ${message}`);
    console.log(`⏱️  Total time: ${elapsed}s\n`);
  }

  _getTimestamp() {
    return new Date().toISOString().substr(11, 8);
  }

  separator() {
    console.log('━'.repeat(80));
  }
}

export default Logger;
