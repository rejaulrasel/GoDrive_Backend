import { NextFunction, Request, Response } from "express";
import { BookingServices } from "./booking.service";

async function createBooking(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await BookingServices.createBookingIntoDb(
      req.user,
      req.body,
      next,
    );
    if (result) {
      res.status(result.statusCode).json({
        success: result.success,
        statusCode: result.statusCode,
        message: result.message,
        data: result.data,
      });
    }
  } catch (error) {
    next(error);
  }
} //end

async function getUserSpecificBookings(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await BookingServices.getUserSpecificBookingsFromDb(
      req.user,
      req.query,
      next,
    );

    if (result) {
      res.status(result.statusCode).json({
        success: result.success,
        statusCode: result.statusCode,
        message: result.message,
        data: result.data,
      });
    }
  } catch (error) {
    next(error);
  }
} //end

async function afterPaymentPatch(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await BookingServices.afterPaymentPatchIntoDb(
      req.user,
      req.body,
      next,
    );
    if (result) {
      if (result) {
        res.status(result.statusCode).json({
          success: result.success,
          statusCode: result.statusCode,
          message: result.message,
          data: result.data,
        });
      }
    }
  } catch (error) {
    next(error);
  }
} //end

async function updateBookingStatus(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await BookingServices.updateBookingStatusIntoDb(
      req.params.bookingId as string,
      req.query.action as "ongoing" | "canceled",
      next,
    );

    if (result) {
      res.status(result.statusCode).json({
        success: result.success,
        statusCode: result.statusCode,
        message: result.message,
        data: result.data,
      });
    }
  } catch (error) {
    next(error);
  }
} //end

async function getAllBookings(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await BookingServices.getAllBookingsFromDb(req.query, next);

    if (result) {
      res.status(result.statusCode).json({
        success: result.success,
        statusCode: result.statusCode,
        message: result.message,
        data: result.data,
      });
    }
  } catch (error) {
    next(error);
  }
} //end

async function deleteCanceledBooking(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await BookingServices.deleteCanceledBookingFromDb(
      req.query._id as string,
      next,
    );
    if (result) {
      res.status(result.statusCode).json({
        success: result.success,
        statusCode: result.statusCode,
        message: result.message,
        data: result.data,
      });
    }
  } catch (error) {
    next(error);
  }
} //end

// exports
export const bookingControllers = {
  createBooking,
  getAllBookings,
  getUserSpecificBookings,
  deleteCanceledBooking,
  updateBookingStatus,
  afterPaymentPatch,
};
