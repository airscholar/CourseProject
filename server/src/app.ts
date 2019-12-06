import swaggerUI from 'swagger-ui-express';
import express from 'express';
import morgan from 'morgan';
import * as Sentry from '@sentry/node';
import { stream } from './config/winston.config';
import swaggerJsDoc from 'swagger-jsdoc';
import env from './config/env.config';
import cors from 'cors';
import { rootRouter } from './routes/router.main';
import errorMiddleware from './middlewares/errorHandler.middleware';

const app = express();

if (env.isDev) {
  app.use(morgan('dev', { stream }));
} else if (env.isProduction) {
  Sentry.init({
    dsn: env.SENTRY_PRIVATE_DSN,
    environment: process.env.NODE_ENV,
  });

  app.use(
    Sentry.Handlers.requestHandler({
      ip: true,
    })
  );
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
  })
);
app.use(rootRouter);

// DOCUMENTATION
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Course Project',
      version: '1.0.0',
      description: 'Course Project App',
    },
    servers: [
      {
        url: 'http://localhost:{port}/',
        description: 'The development server',
        variables: {
          port: {
            enum: ['4000', '443'],
            default: '4000',
          },
        },
      },
      {
        url: 'http://prod-server:{port}/',
        description: 'The production server',
        variables: {
          port: {
            enum: ['5000', '443'],
            default: '5000',
          },
        },
      },
    ],
  },
  apis: ['./src/api.documentation.ts', './src/routes/shortener.routes.docs.ts'],
};
const swaggerSpecs = swaggerJsDoc(options);
app.use('/api/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

app.use(errorMiddleware);

export { app };
