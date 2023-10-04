import request from "supertest";
import { app } from "../src/app";
import { connectDB, closeDB, AppDataSource } from "../src/data-source";
import { User } from "../src/entity/User";

beforeAll(async () => {
  await connectDB();
});

const signupData = {
  username: "jesttest",
  name: "Jest Test User",
  email: "jesttest@gmail.com",
  password: "900000000iI@",
};

const signinData = {
  username: signupData.username,
  password: signupData.password,
};

describe("Health Endpoints", () => {
  it("Signup should return 201", async () => {
    const res = await request(app).post("/api/v1/auth/signup").send(signupData);
    expect(res.statusCode).toEqual(201);
  });
  it("Signin should return 200", async () => {
    const res = await request(app).post("/api/v1/auth/signin").send(signinData);
    expect(res.statusCode).toEqual(200);
  });
});

//Use afterEach method to run after each test
afterAll(async () => {
  await AppDataSource.getRepository(User).delete({
    username: signupData.username,
  });
  await closeDB();
});
