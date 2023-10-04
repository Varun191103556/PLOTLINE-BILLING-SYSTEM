import { ServiceAPIResponse } from "../../types/service-response";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";

const deleteProduct = async (
  id: number
): Promise<ServiceAPIResponse<undefined>> => {
  /* Delete a specific product */
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
  productRepository.remove(product);
  return {
    statusCode: 200,
    body: { success: true, message: "🛒 Deleted the product successfully" },
  };
};

export { deleteProduct };
