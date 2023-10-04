import { Request, Response } from "express";
import logger from "../common/logger";
import * as getProductService from "../services/getproduct.service";
import * as addProductService from "../services/addproduct.service";
import * as deleteProductService from "../services/deleteproduct.service";
import * as modifyProductService from "../services/modifyproduct.service";

const getAll = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    const data = await getProductService.getAll(id);

    res.status(data.statusCode).send(data.body);
  } catch (e: any) {
    logger.error(e.message);

    res.status(500).send(e.message);
  }
};

const getProductbyID = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    const data = await getProductService.getProductbyID(+id);

    res.status(data.statusCode).send(data.body);
  } catch (e: any) {
    logger.error(e.message);

    res.status(500).send(e.message);
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const data = await addProductService.addProduct(req.body);

    res.status(data.statusCode).send(data.body);
  } catch (e: any) {
    logger.error(e.message);

    res.status(500).send(e.message);
  }
};

const modifyProduct = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    const data = await modifyProductService.modifyProduct(+id, req.body);

    res.status(data.statusCode).send(data.body);
  } catch (e: any) {
    logger.error(e.message);

    res.status(500).send(e.message);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    const data = await deleteProductService.deleteProduct(+id);

    res.status(data.statusCode).send(data.body);
  } catch (e: any) {
    logger.error(e.message);

    res.status(500).send(e.message);
  }
};
export { getAll, addProduct, getProductbyID, deleteProduct, modifyProduct };
