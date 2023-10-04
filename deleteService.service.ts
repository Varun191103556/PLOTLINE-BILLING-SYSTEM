import { ServiceAPIResponse } from "../../types/service-response";
import { AppDataSource } from "../data-source";
import { Service } from "../entity/Service";

const deleteService = async (
  id: number
): Promise<ServiceAPIResponse<undefined>> => {
  /* Delete a specific product */
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
  serviceRepository.remove(service);
  return {
    statusCode: 200,
    body: { success: true, message: "👨‍🔧 Deleted the service successfully" },
  };
};

export { deleteService };
