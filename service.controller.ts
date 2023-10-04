import { Request, Response } from "express";
import logger from "../common/logger";
import * as getService from "../services/getservice.service";
import * as addServicemain from "../services/addservice.service";
import * as deleteServiceMain from "../services/deleteService.service";
import * as modifyServiceMain from "../services/modifyService.service";

const getAll = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    const data = await getService.getAll(id);

    res.status(data.statusCode).send(data.body);
  } catch (e: any) {
    logger.error(e.message);

    res.status(500).send(e.message);
  }
};

const getServicebyID = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    const data = await getService.getServicebyID(+id);

    res.status(data.statusCode).send(data.body);
  } catch (e: any) {
    logger.error(e.message);

    res.status(500).send(e.message);
  }
};

const addService = async (req: Request, res: Response) => {
  try {
    const data = await addServicemain.addService(req.body);

    res.status(data.statusCode).send(data.body);
  } catch (e: any) {
    logger.error(e.message);

    res.status(500).send(e.message);
  }
};

const modifyService = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    const data = await modifyServiceMain.modifyService(+id, req.body);

    res.status(data.statusCode).send(data.body);
  } catch (e: any) {
    logger.error(e.message);

    res.status(500).send(e.message);
  }
};

const deleteService = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    const data = await deleteServiceMain.deleteService(+id);

    res.status(data.statusCode).send(data.body);
  } catch (e: any) {
    logger.error(e.message);

    res.status(500).send(e.message);
  }
};
export { getAll, addService, getServicebyID, deleteService, modifyService };
