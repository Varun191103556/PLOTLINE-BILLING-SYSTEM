import { ServiceAPIResponse } from "../../types/service-response";
import { SignupSchema } from "../validators/auth.validator";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import * as bcrypt from "bcrypt";

const signUp = async (
  data: SignupSchema
): Promise<ServiceAPIResponse<User>> => {
  /* Create a new user */
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: [{ email: data.email }, { username: data.username }],
  });
  if (user) {
    return {
      statusCode: 403,
      body: { success: false, message: "🤵 User Already Exists" },
    };
  }

  const saltRounds = 10;
  const hash = await bcrypt.hash(data.password, saltRounds);
  data.password = hash;
  const createdUser = await userRepository.save(data);
  return {
    statusCode: 201,
    body: {
      success: true,
      message: "🙎 User Registered Successfully",
      data: createdUser,
    },
  };
};

export { signUp };
