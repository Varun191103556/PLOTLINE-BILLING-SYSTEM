import * as yup from "yup";

export const yupSignupSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required("Please provide an username")
    .min(3, "Minimum required characters required is 3")
    .max(50, "Max allowed characters is 50"),
  name: yup
    .string()
    .trim()
    .required("Please provide your full name")
    .min(3, "Minimum required characters required is 3")
    .max(100, "Max allowed characters is 100"),
  password: yup
    .string()
    .trim()
    .required("Please provide a password")
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gm,
      "Password not matches required characters"
    ),
  email: yup
    .string()
    .required("Please provide an email address")
    .email()
    .trim()
    .min(3, "Minimum required characters required is 3")
    .max(50, "Max allowed characters is 50"),
  isAdmin: yup.boolean().default(false),
  isVerified: yup.boolean().default(false),
});

export type SignupSchema = yup.InferType<typeof yupSignupSchema>;

export const yupSignInSchema = yup.object({
  username: yup
    .string()
    .required("Please provide the username")
    .trim()
    .min(3, "Minimum required characters required is 3")
    .max(50, "Max allowed characters is 50"),
  password: yup
    .string()
    .required("Please provide the password")
    .trim()
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gm,
      "Username or Password not valid"
    ),
});

export type SignInSchema = yup.InferType<typeof yupSignInSchema>;
