/**
 * Browser-compatible file download utility
 * Replaces VBScript FileSystemObject functionality
 */

export class FileDownloader {
  /**
   * Create a downloadable file from content
   * @param {string} content - File content
   * @param {string} filename - Filename with extension
   * @param {string} mimeType - MIME type (default: text/html)
   */
  static downloadFile(content, filename, mimeType = 'text/html') {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Save report as HTML file
   * @param {string} reportContent - HTML report content
   * @param {string} filename - Filename without extension
   */
  static saveReport(reportContent, filename) {
    const fullFilename = filename.endsWith('.htm') ? filename : `${filename}.htm`;
    this.downloadFile(reportContent, fullFilename, 'text/html');
    return fullFilename;
  }

  /**
   * Check if download is supported
   */
  static isSupported() {
    return typeof Blob !== 'undefined' && typeof URL !== 'undefined' && typeof document !== 'undefined';
  }

  /**
   * Generate report HTML from assessment data
   * @param {object} data - Assessment data with name, age, code, scores
   */
  static generateReport(data) {
    const { name, age, code, scores, gender } = data;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MCMI-II Report - ${name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      min-height: 100vh;
    }
    .report-container {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px;
      text-align: center;
    }
    .header h1 {
      font-size: 2.5rem;
      margin-bottom: 10px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    }
    .header p {
      font-size: 1.1rem;
      opacity: 0.95;
    }
    .content {
      padding: 40px;
    }
    .patient-info {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
      padding: 25px;
      border-radius: 12px;
      margin-bottom: 30px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .patient-info h2 {
      font-size: 1.5rem;
      margin-bottom: 15px;
      border-bottom: 2px solid rgba(255,255,255,0.3);
      padding-bottom: 10px;
    }
    .patient-info p {
      margin: 8px 0;
      font-size: 1.05rem;
    }
    .patient-info strong {
      display: inline-block;
      min-width: 100px;
    }
    .section {
      margin: 30px 0;
    }
    .section h2 {
      color: #667eea;
      font-size: 1.8rem;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 3px solid #667eea;
    }
    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      margin: 20px 0;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      border-radius: 12px;
      overflow: hidden;
    }
    thead {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    th {
      padding: 16px;
      text-align: left;
      font-weight: 600;
      font-size: 1.05rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    tbody tr {
      background: white;
      transition: all 0.3s ease;
    }
    tbody tr:nth-child(even) {
      background: #f8f9fa;
    }
    tbody tr:hover {
      background: #e3f2fd;
      transform: scale(1.01);
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    td {
      padding: 14px 16px;
      border-bottom: 1px solid #e0e0e0;
    }
    tbody tr:last-child td {
      border-bottom: none;
    }
    .score-value {
      font-weight: 600;
      font-size: 1.1rem;
      color: #667eea;
    }
    .footer {
      background: #f8f9fa;
      padding: 30px;
      text-align: center;
      border-top: 2px solid #e0e0e0;
      color: #666;
    }
    .footer p {
      margin: 8px 0;
      font-size: 0.95rem;
    }
    .generated-date {
      background: #e3f2fd;
      padding: 15px;
      border-radius: 8px;
      margin-top: 20px;
      text-align: center;
      font-style: italic;
      color: #555;
    }
    @media print {
      body { background: white; padding: 0; }
      .report-container { box-shadow: none; }
    }
  </style>
</head>
<body>
  <div class="report-container">
    <div class="header">
      <h1>🏥 MCMI-II Assessment Report</h1>
      <p>Millon Clinical Multiaxial Inventory - II</p>
    </div>
    
    <div class="content">
      <div class="patient-info">
        <h2>📋 Patient Information</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Age:</strong> ${age} years</p>
        <p><strong>Gender:</strong> ${gender || 'Not specified'}</p>
        <p><strong>Code:</strong> ${code || 'N/A'}</p>
      </div>

      <div class="section">
        <h2>📊 Clinical Scales & Scores</h2>
        <table>
          <thead>
            <tr>
              <th>Scale Name</th>
              <th>Scale Code</th>
              <th>Raw Score</th>
            </tr>
          </thead>
          <tbody>
            ${scores.map(score => `
            <tr>
              <td><strong>${score.name}</strong></td>
              <td>${score.code}</td>
              <td class="score-value">${score.value}</td>
            </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="generated-date">
        <p><strong>Report Generated:</strong> ${new Date().toLocaleString('en-US', { 
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}</p>
      </div>
    </div>

    <div class="footer">
      <p><strong>MCMI-II Assessment Tool</strong> - Modernized Web Application</p>
      <p>This report was generated automatically from the assessment responses.</p>
      <p>© ${new Date().getFullYear()} - For clinical use only</p>
    </div>
  </div>
</body>
</html>`;

    return html;
  }
}

export default FileDownloader;
