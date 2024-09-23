import { NextFunction, Request, Response } from "express";
import { BookingServices } from "./booking.service";


async function createBooking(req: Request, res: Response, next: NextFunction) {

    try {
        const result = await BookingServices.createBookingIntoDb(req.user, req.body, next);
        if (result) {
            res.status(result.statusCode).json({
                success: result.success,
                statusCode: result.statusCode,
                message: result.message,
                data: result.data,
            });

        };

    } catch (error) {
        next(error);
    }

} //end



async function getUserSpecificBookings(req: Request, res: Response, next: NextFunction) {

    try {
        const result = await BookingServices.getUserSpecificBookingsFromDb(req.user, req.query, next);

        if (result) {
            res.status(result.statusCode).json({
                success: result.success,
                statusCode: result.statusCode,
                message: result.message,
                data: result.data,
            });

        };

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
        next(error)
    }
} //end





// exports
export const bookingControllers = {
    createBooking,
    getAllBookings,
    getUserSpecificBookings,


}