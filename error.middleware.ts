/* eslint-disable no-unused-vars */

import { Request, Response, NextFunction } from "express";

import HttpException from "../common/http-exception";

const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.statusCode || 500;
  //console.log(err);
  res.status(status).send(err.body);
};

export { errorHandler };
