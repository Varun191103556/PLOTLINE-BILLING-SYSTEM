import { ServiceAPIResponse } from "../../types/service-response";
import { AppDataSource } from "../data-source";
import { Service } from "../entity/Service";
import { ModifyProductSchema } from "../validators/product.validator";

const modifyService = async (
  id: number,
  data: ModifyProductSchema
): Promise<ServiceAPIResponse<undefined>> => {
  /* Delete a specific product */
  if (!data.name && !data.price) {
    return {
      statusCode: 400,
      body: {
        success: false,
        message: "👨‍🔧 No data was provided to update",
      },
    };
  }
  const serviceRepository = await AppDataSource.getRepository(Service);
  const service = await serviceRepository.findBy({
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
  await serviceRepository.update({ id: id }, data);
  return {
    statusCode: 200,
    body: { success: true, message: "👨‍🔧 Modified the service successfully" },
  };
};

export { modifyService };
