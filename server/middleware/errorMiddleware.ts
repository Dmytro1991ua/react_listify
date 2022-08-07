import { Request, Response, NextFunction } from "express";

export const customExpressErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({ message: err.message, stack: process.env.NODE_ENV === "production" ? null : err.stack });
};
