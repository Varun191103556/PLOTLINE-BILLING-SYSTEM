import request from "supertest";
import { app } from "../src/app";

describe("Health Endpoints", () => {
  it("Health Simple should return 200", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.statusCode).toEqual(200);
  });
  it("Health Debug should return 200", async () => {
    const res = await request(app).get("/api/v1/health/debug");
    expect(res.statusCode).toEqual(200);
  });
  it("Backend should return 200", async () => {
    const res = await request(app).get("/api/v1");
    expect(res.statusCode).toEqual(200);
  });
});
