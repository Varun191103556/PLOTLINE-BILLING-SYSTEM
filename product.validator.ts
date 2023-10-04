import * as yup from "yup";

export const yupAddProduct = yup.object({
  name: yup
    .string()
    .trim()
    .min(3, "Minimum required characters required is 3")
    .max(200, "Max allowed characters is 200")
    .required("Please specify a name for Product"),

  price: yup.number().required("Please specify a price for Product"),
});

export type AddProductSchema = yup.InferType<typeof yupAddProduct>;

export const yupGetProduct = yup.object({
  id: yup
    .string()
    .required("Please provide a number")
    .matches(/^[0-9]+$/g, "Please prove a number"),
});

export const yupModifyProduct = yup
  .object({
    name: yup
      .string()
      .trim()
      .min(3, "Minimum required characters required is 3")
      .max(200, "Max allowed characters is 200"),

    price: yup.number(),
  })
  .noUnknown(true)
  .strict();

export type ModifyProductSchema = yup.InferType<typeof yupAddProduct>;
