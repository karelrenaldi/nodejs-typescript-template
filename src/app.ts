import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response, ErrorRequestHandler } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { apiVersion, defaultPort } from '@src/configs/server';
import routerV1 from '@src/routes/v1';
import logger from '@src/helpers/logger';

const main = () => {
  const app = express();
  const port: string = defaultPort || '3000';
  const versionURL: string = process.env.VERSION_URL || '/api/v1';

  // Proxy setup for production.
  if (process.env.NODE_ENV === 'production') app.set('trust proxy', 1);

  // Service init and global middlewares.
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors({ credentials: true, origin: true }));

  // Service routing.
  app.use(versionURL, routerV1);
  app.use((_req: Request, res: Response) => {
    return res.status(StatusCodes.NOT_FOUND).json({
      apiVersion,
      error: { code: StatusCodes.NOT_FOUND, message: ReasonPhrases.NOT_FOUND },
    });
  });
  app.use((err: ErrorRequestHandler, req: Request, res: Response) => {
    logger.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      apiVersion,
      error: {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
      },
    });
  });

  // Starting service.
  app.listen(port, () => logger.info(`Service running on port ${port}`));
};

// Setup config.
const cfg = dotenv.config();
if (cfg.error) {
  logger.error(cfg.error);
  process.exit(1);
}

// Start main service.
main();
