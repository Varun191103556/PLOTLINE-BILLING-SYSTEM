import { ServiceAPIResponse } from "../../types/service-response";
import { AppDataSource } from "../data-source";
import { Service } from "../entity/Service";
import { AddProductSchema } from "../validators/product.validator";

const addService = async (
  data: AddProductSchema
): Promise<ServiceAPIResponse<Service>> => {
  /* Create new product here */
  const serviceRepository = await AppDataSource.getRepository(Service);
  const service = await serviceRepository.findOneBy({ name: data.name });
  if (service) {
    return {
      statusCode: 400,
      body: {
        success: false,
        message: "👨‍🔧 Service with that name is already there",
      },
    };
  }
  const savedService = await serviceRepository.save(data);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: "👨‍🔧 Added the service successfully",
      data: savedService,
    },
  };
};

export { addService };
