import * as yup from "yup";

export const yupJwtHeader = yup.object({
  authorization: yup
    .string()
    .trim()
    .min(1, "JWT cannot be null")
    .matches(/^Bearer .+$/, "JWT should be Bearer Token")
    .required("No JWT authorization Token available"),
});

export type JwtHeader = yup.InferType<typeof yupJwtHeader>;
