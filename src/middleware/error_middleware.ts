import { NextFunction, Request, Response } from "express";
import { ApiError, ValidatorError } from "../error";

export const ErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  switch (true) {
    case err instanceof ValidatorError:
      res.status(400).json({ message: err.message });
      break;
    case err instanceof ApiError:
      res.status(err.status).json({ message: err.message });
      break;
    default:
      res.status(500).json({ message: "Internal server error" });
      break;
  }
};
