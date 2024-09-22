import express, { Application, Request, Response } from "express";
import cors from "cors";
import status from "http-status";

import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";

import { UserRoutes } from "./app/modules/user/user.route";
import { CarRoutes } from "./app/modules/car/car.route";

const app: Application = express();

// parser
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

// test endpoint
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the car rental resevation system!");
});

// application route;
app.use("/api/auth", UserRoutes);
app.use("/api/cars", CarRoutes);

// global error handler
app.use(globalErrorHandler);

// not found route
app.all("*", (req: Request, res: Response) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    statusCode: status.NOT_FOUND,
    message: "Not Found",
  });
});

export default app;
