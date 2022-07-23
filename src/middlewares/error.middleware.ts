import { NextFunction, Request, Response } from 'express';
import pino from 'pino';

const logger = pino();

export function errorMiddleware(
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
): void {
  logger.error(error.stack);
  res.status(500).send('Application error');
  next(error);
}
