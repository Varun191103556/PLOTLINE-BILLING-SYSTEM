import { ServiceAPIResponse } from "../../types/service-response";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import { ModifyProductSchema } from "../validators/product.validator";

const modifyProduct = async (
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
  const productRepository = await AppDataSource.getRepository(Product);
  const product = await productRepository.findBy({
    id: id,
  });
  if (product.length === 0) {
    return {
      statusCode: 404,
      body: {
        success: false,
        message: "🛒 No product found with the ID",
      },
    };
  }
  await productRepository.update({ id: id }, data);
  return {
    statusCode: 200,
    body: { success: true, message: "🛒 Modified the product successfully" },
  };
};

export { modifyProduct };
