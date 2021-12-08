const {LogManager} = require('./LogManager');

const logManager = new LogManager();

logManager.addInfo('Hello distributed log files!');
logManager.addError("error log!");