const {LogManager} = require('./LogManager');
const {LogToJsonFile} = require('./LogToJsonFile');
const content = require('./data.json');

// Exemple Winston
const logManager = new LogManager();
logManager.addInfo('Hello distributed log files!');
logManager.addError("error log!");


// Exemple FS
const logToJsonFile = new LogToJsonFile();
logToJsonFile.save("Auction",content);