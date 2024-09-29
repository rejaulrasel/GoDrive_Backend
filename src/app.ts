import express, { Application, Request, Response } from "express";
import cors from "cors";
import status from "http-status";

import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";

import { UserRoutes } from "./app/modules/user/user.route";
import { CarRoutes } from "./app/modules/car/car.route";
import { BookingRoutes } from "./app/modules/booking/booking.route";
import Auth from "./app/middlewares/auth";
import { stripe } from "./app/modules/payment/payment.stripe";
import { adminStatistics } from "./app/modules/statistics/statistics.admin";

const app: Application = express();

// parser
app.use(express.json());
app.use(
  cors({
    origin: ["https://car-rental-new-v1.vercel.app"],
    credentials: true,
  }),
);

// test endpoint
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the car rental resevation system ever new!");
});

// application route;
app.use("/api/auth", UserRoutes);
app.use("/api/cars", CarRoutes);
app.use("/api/bookings", BookingRoutes);
app.get("/api/statistics/admin", Auth("admin"), adminStatistics.statistics);
app.post("/api/user/booking/pay", Auth("user"), stripe);

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
