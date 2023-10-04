/* eslint-disable no-unused-vars */

import { Request, Response, NextFunction } from "express";
import { ResponseBody } from "../../types/service-response";

const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const message = "🗑️ Resource not found";

  res
    .status(404)
    .send({ success: false, message: message } as ResponseBody<undefined>);
};

export { notFoundHandler };
