import { Request, Response } from "express";

import logger from "../common/logger";

import * as signUpService from "../services/signup.service";
import * as signInService from "../services/signin.service";

const signUp = async (req: Request, res: Response) => {
  try {
    const data = await signUpService.signUp(req.body);
    let resBody: any = data.body;
    delete resBody.data?.password;
    res.status(data.statusCode).send(resBody);
  } catch (e: any) {
    logger.error(e.message);
    res.status(500).send(e.message);
  }
};

const signIn = async (req: Request, res: Response) => {
  try {
    const data = await signInService.signIn(req.body);
    let resBody: any = data.body;
    delete resBody.data?.password;
    res.status(data.statusCode).send(resBody);
  } catch (e: any) {
    logger.error(e.message);
    res.status(500).send(e.message);
  }
};

export { signUp, signIn };
