import { NextFunction, Request, Response } from "express";
import HttpException from "../services/error.exception";
import { response } from "../services/response";

function errorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction) {
  const responseObj = { statusCode: error.status || 500, message: error.message || "Something went wrong" };

  res.status(error.status || 500).send(responseObj);
}

export default errorMiddleware;
