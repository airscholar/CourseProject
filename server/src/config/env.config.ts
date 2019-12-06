import { bool, cleanEnv, num, str } from 'envalid';

const env = cleanEnv(process.env, {
  PORT: num({ default: 4000 }),
  APP_PROTOCOL: str({ example: 'http' }),
  SITE_NAME: str({ example: 'CourseProject' }),
  APP_DOMAIN: str({ example: 'localhost' }),
  LINK_LENGTH: num({ default: 6 }),
  CORS_ORIGIN: str({ default: 'localhost:8080' }),
  SENTRY_PRIVATE_DSN: str({ default: '' }),
  SENTRY_PUBLIC_DSN: str({ default: '' }),

  LOG_JSON_STYLE: bool({ default: true }),
  LOG_DATE_FORMAT: str({ default: 'YYYY-MM-DD HH:mm:ss' }),

  LOG_INFO_MAX_SIZE: num({ default: 5242880 }),
  LOG_INFO_MAX_FILES: num({ default: 100 }),
  LOG_INFO_COLORIZE: bool({ default: true }),

  LOG_ERROR_MAX_SIZE: num({ default: 5242880 }),
  LOG_ERROR_MAX_FILES: num({ default: 100 }),
  LOG_ERROR_COLORIZE: bool({ default: true }),
});

export default env;
