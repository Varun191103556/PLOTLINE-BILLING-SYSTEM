import type { Config } from "jest";
import "dotenv/config";

export default async (): Promise<Config> => {
  return {
    verbose: process.env.NODE_ENV === "production" ? false : true,
    preset: "ts-jest",
    testEnvironment: "node",
    testTimeout: 30000,
  };
};
