import { ServiceAPIResponse } from "../../types/service-response";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import { AddProductSchema } from "../validators/product.validator";

const addProduct = async (
  data: AddProductSchema
): Promise<ServiceAPIResponse<Product>> => {
  /* Create new product here */
  const productsRepository = await AppDataSource.getRepository(Product);
  const product = await productsRepository.findOneBy({ name: data.name });
  if (product) {
    return {
      statusCode: 400,
      body: {
        success: false,
        message: "🛒 Product with that name is already there",
      },
    };
  }
  const savedProduct = await productsRepository.save(data);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: "🛒 Added the product successfully",
      data: savedProduct,
    },
  };
};

export { addProduct };
