import { Request, Response } from "express";

import logger from "../common/logger";

import * as healthService from "../services/health.service";

const getSimple = async (req: Request, res: Response) => {
  try {
    const data = await healthService.getSimple();

    res.status(data.statusCode).send(data.body);
  } catch (e: any) {
    logger.error(e.message);

    res.status(500).send(e.message);
  }
};

const getDetailed = async (req: Request, res: Response) => {
  try {
    const data = await healthService.getDetailed(req.ip);

    res.status(data.statusCode).send(data.body);
  } catch (e: any) {
    logger.error(e.message);

    res.status(500).send(e.message);
  }
};

export { getSimple, getDetailed };
