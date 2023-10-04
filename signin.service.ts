import { ServiceAPIResponse } from "../../types/service-response";
import { SignInSchema } from "../validators/auth.validator";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import * as bcrypt from "bcrypt";
import { JwtPayload, sign } from "jsonwebtoken";

const signIn = async (
  data: SignInSchema
): Promise<ServiceAPIResponse<User>> => {
  /* Signin a registered user */
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { username: data.username },
  });
  if (!user) {
    return {
      statusCode: 404,
      body: { success: false, message: "🤦🏻 User doesn't Exists" },
    };
  }
  const valid = await bcrypt.compare(data.password, user.password);

  if (!valid) {
    return {
      statusCode: 401,
      body: {
        success: false,
        message: "🤷🏼 Please check your email or password",
      },
    };
  }
  let userExists: any = user;
  const jwtToken = sign(
    <JwtPayload>{
      id: user.id,
    },
    process.env.JWT_SECRET!,
    {
      issuer: "Plotline",
      expiresIn: "240h",
    }
  );

  delete userExists.password;
  userExists.token = jwtToken;
  return {
    statusCode: 200,
    body: {
      success: true,
      message: "🙎 User Signed in Successfully",
      data: userExists,
    },
  };
};

export { signIn };
