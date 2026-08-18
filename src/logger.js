const fs = require('fs');
const path = require('path');

class Logger {
  constructor() {
    this.logDir = './logs';
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir);
    }
  }

  log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${message}\n`;
    console.log(logMessage.trim());
    
    const logFile = path.join(this.logDir, 'app.log');
    fs.appendFileSync(logFile, logMessage);
  }

  error(message) {
    this.log(`ERROR: ${message}`);
  }
}

module.exports = new Logger();
