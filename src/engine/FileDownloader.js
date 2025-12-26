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
    // Create a Blob from the content
    const blob = new Blob([content], { type: mimeType });

    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
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
    const { name, age, code, scores } = data;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MCMI-II Report - ${name}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
      background: #f5f5f5;
    }
    .report-container {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h1 {
      color: #2c3e50;
      border-bottom: 3px solid #3498db;
      padding-bottom: 10px;
    }
    .patient-info {
      background: #ecf0f1;
      padding: 15px;
      border-radius: 5px;
      margin: 20px 0;
    }
    .patient-info p {
      margin: 5px 0;
      font-size: 14px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background: #3498db;
      color: white;
      font-weight: bold;
    }
    tr:hover {
      background: #f8f9fa;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      font-size: 12px;
      color: #7f8c8d;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="report-container">
    <h1>MCMI-II Assessment Report</h1>
    
    <div class="patient-info">
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Age:</strong> ${age}</p>
      <p><strong>Code:</strong> ${code}</p>
      <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
    </div>

    <h2>Clinical Scales</h2>
    <table>
      <thead>
        <tr>
          <th>Scale</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        ${scores.map(score => `
        <tr>
          <td>${score.name}</td>
          <td>${score.value}</td>
        </tr>
        `).join('')}
      </tbody>
    </table>

    <div class="footer">
      <p>MCMI-II Assessment Tool - Modernized Version</p>
      <p>This report was generated automatically from the assessment results.</p>
    </div>
  </div>
</body>
</html>`;

    return html;
  }
}

export default FileDownloader;
