import { Request, Response, NextFunction } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import "dotenv/config";
import { JwtHeader } from "../validators/jwt.validator";
import { ServiceAPIResponse } from "../../types/service-response";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export const validateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers as JwtHeader;
    const authToken = authorization.split(" ")[1];
    const decoded = verify(authToken, process.env.JWT_SECRET!);

    const user = await AppDataSource.getRepository(User).findOneBy({
      id: (<JwtPayload>decoded).id,
    });
    if (!user) {
      throw new Error("🔑 Please login and try again.");
    }

    res.locals.user = user as User;
    next();
  } catch (err: Error | any) {
    next({
      statusCode: 401,
      body: { success: false, message: `${err.name}: ${err.message}` },
    } as ServiceAPIResponse<undefined>);
  }
};
