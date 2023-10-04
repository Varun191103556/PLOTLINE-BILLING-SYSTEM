import { ServiceAPIResponse } from "../../types/service-response";
import { AppDataSource } from "../data-source";
import { Service } from "../entity/Service";

const getAll = async (
  page: string
): Promise<ServiceAPIResponse<Array<Service>>> => {
  /* fetch all products here */
  if (+page < 1) {
    return {
      statusCode: 400,
      body: { success: false, message: "👨‍🔧 Page Number should start from 1" },
    };
  }
  const limit: number = 5;
  const skip: number = (+page - 1) * limit;

  const services = await AppDataSource.getRepository(Service).find({
    order: {
      id: "ASC",
    },
    skip: skip,
    take: limit,
  });
  return {
    statusCode: 200,
    body: { success: true, message: "👨‍🔧 Fetched all services", data: services },
  };
};

const getServicebyID = async (
  id: number
): Promise<ServiceAPIResponse<Array<Service>>> => {
  /* fetch the specific product here */
  const service = await AppDataSource.getRepository(Service).findBy({
    id: id,
  });
  if (service.length === 0) {
    return {
      statusCode: 404,
      body: {
        success: false,
        message: "👨‍🔧 No service found with the ID",
      },
    };
  }
  return {
    statusCode: 200,
    body: { success: true, message: "👨‍🔧 Fetched the service", data: service },
  };
};

export { getAll, getServicebyID };
