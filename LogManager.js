const winston = require('winston');

const LOG_LEVELS = {
  ERROR: "error",
  WARN: "warn",
  INFO: "info",
  HTTP: "http",
  VERBOSE: "verbose",
  DEBUG: "debug",
  SILLY: "silly",
}

class LogManager {

  logger;

  /**
   * Constructor
   * @param level
   */
  constructor(level = LOG_LEVELS.INFO) {
    this.initLogger(level);
  }

  /**
   * Initialise winston logger
   * @param level
   */
  initLogger(level) {

    if (!level || level === "") {
      level = LOG_LEVELS.INFO;
    }

    const dateString = this.getDateString();

    this.logger = winston.createLogger({
      level: level,
      format: winston.format.json(),
      defaultMeta: {service: 'user-service'},
      transports: [
        new winston.transports.File({filename: `./logs/${dateString}/error.log`, level: 'error'}),
        new winston.transports.File({filename: `./logs/${dateString}/combined.log`}),
      ],
    });

    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(new winston.transports.Console({
        format: winston.format.simple(),
      }));
    }
  }

  /**
   * Get string date now
   * @returns {string}
   */
  getDateString(){
    const dateNow = new Date(Date.now());
    const dateString = `${dateNow.toISOString()}`
      .replace(/:/g,"")
      .split(".")[0]
    ;
    return dateString;
  }

  /**
   * Add info log
   * @param message
   */
  addInfo(message) {
    this.logger.log({
      level: 'info',
      message: message
    });
  }

  /**
   * Add error log
   * @param message
   */
  addError(message) {
    this.logger.log({
      level: 'error',
      message: message
    });
  }
}

module.exports = {
  LOG_LEVELS,
  LogManager,
};