import * as yup from "yup";
import { Request, Response, NextFunction } from "express";
import { ServiceAPIResponse } from "../../types/service-response";

type RequestLocations = "query" | "body" | "params" | "headers" | "files";

const yupValidator =
  (location: RequestLocations, schema: yup.ObjectSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    let _location: any;
    switch (location) {
      case "query":
        _location = req.query;
        break;
      case "body":
        _location = req.body;
        break;
      case "params":
        _location = req.params;
        break;
      case "headers":
        _location = req.headers;
        break;
    }
    try {
      await schema.validate(_location, { abortEarly: false });
      next();
    } catch (error: Error | any) {
      let message: Array<string> = [];
      let errorCount = 1;
      error.errors.forEach((e: string) => {
        let error = `${errorCount}. ${e} `;
        message.push(error);
        errorCount++;
      });
      next({
        statusCode: 404,
        body: { success: false, message: message },
      } as ServiceAPIResponse<undefined>);
    }
  };

export default yupValidator;
