import appRoot from "app-root-path";
import winston from "winston";
import env from "./env.config";

const { combine, colorize, printf, timestamp } = winston.format;

const logFormat = printf(info => {
  return `[${info.timestamp}] ${info.level}: ${info.message}`;
});

const rawFormat = printf(info => {
  return `[${info.timestamp}] ${info.level}: ${info.message}`;
});

// define the custom settings for each transport (file, console)
const options = {
  file: {
    level: "info",
    filename: `${appRoot}/logs/app.log`, //TODO: STRUCTURE THIS TO ROTATE TO AVOID BIG LOG
    handleExceptions: true,
    json: env.LOG_JSON_STYLE,
    maxsize: env.LOG_INFO_MAX_SIZE, // 5MB
    maxFiles: env.LOG_INFO_MAX_FILES,
    colorize: env.LOG_INFO_COLORIZE,
  },
  errorFile: {
    level: "error",
    name: "file.error",
    filename: `${appRoot}/logs/error.log`, //TODO: STRUCTURE THIS TO ROTATE TO AVOID BIG LOG
    handleExceptions: true,
    json: env.LOG_JSON_STYLE,
    maxsize: env.LOG_ERROR_MAX_SIZE, // 5MB
    maxFiles: env.LOG_ERROR_MAX_FILES,
    colorize: env.LOG_ERROR_COLORIZE,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: env.LOG_JSON_STYLE,
    format: combine(colorize(), rawFormat),
  },
};

// instantiate a new Winston Logger with the settings defined above
export const logger = winston.createLogger({
  format: combine(timestamp({ format: env.LOG_DATE_FORMAT }), logFormat),
  transports: [new winston.transports.File(options.file), new winston.transports.Console(options.console)],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
export const stream = {
  write: (message: any) => {
    logger.info(message);
  },
};

winston.addColors({
  debug: "white",
  error: "red",
  info: "green",
  warn: "yellow",
});
