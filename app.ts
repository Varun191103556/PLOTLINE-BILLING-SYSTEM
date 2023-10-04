import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import "reflect-metadata";
import { ResponseBody } from "../types/service-response";
import * as middleware from "./middleware";

import healthRouter from "./routers/health.router";
import productRouter from "./routers/product.router";
import authRouter from "./routers/auth.router";
import cartRouter from "./routers/cart.router";
import orderRouter from "./routers/order.router";
import serviceRouter from "./routers/service.router";

const app: Express = express();

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(middleware.httpLogger);

app.get("/api/v1", (req: Request, res: Response) => {
  res.status(200).send({
    success: true,
    message: "📖 Welcome to Plotline Billing System Backend!",
  } as ResponseBody<undefined>);
});

// Main routers

app.use("/api/v1/health", healthRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/service", serviceRouter);

// Error hanlding middleware

app.use(middleware.errorHandler);

app.use(middleware.notFoundHandler);

export { app };
