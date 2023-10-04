import * as yup from "yup";

export const yupAddCart = yup.object({
  product_id: yup.number().min(1, "Product ID should be greater than 1"),
  service_id: yup.number().min(1, "Service ID should be greater than 1"),
  quantity: yup
    .number()
    .required("Please provide quantity")
    .min(1, "Cary Item should be at least 1 in quantity"),
});

export type AddCartSchema = yup.InferType<typeof yupAddCart>;
