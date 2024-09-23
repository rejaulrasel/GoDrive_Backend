import { NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import Car from "../car/car.model";
import isValidDate from "../../middlewares/checkValidDate";
import httpStatus from "http-status";
import User from "../user/user.model";
import Booking from "./booking.model";


async function createBookingIntoDb(user: JwtPayload, payload: any, next: NextFunction) {
    const session = await mongoose.startSession();
    // const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (isValidDate(payload.date)) {

        try {

            // start session
            session.startTransaction();

            const fullCarObj = await Car.findById(payload.carId).session(session);


            if (!fullCarObj || fullCarObj.isDeleted) {
                return {
                    success: false,
                    statusCode: httpStatus.BAD_REQUEST,
                    message: 'The car ID you provided is incorrect or the car is past way',
                    data: []
                };
            }

            if (fullCarObj.status === 'unavailable') {
                return {
                    success: false,
                    statusCode: httpStatus.BAD_REQUEST,
                    message: 'Car is not available right now!',
                    data: []
                };

            };

            const userObj = await User.findOne({ email: user.user }).session(session);
            if (!userObj) {
                return {
                    success: false,
                    statusCode: httpStatus.BAD_REQUEST,
                    message: 'Booking Unsuccessful',
                    data: []
                }
            };

            const updateCarStatus = await Car.findByIdAndUpdate(payload.carId, { status: 'unavailable' }).session(session);
            if (!updateCarStatus) {
                return {
                    success: false,
                    statusCode: httpStatus.BAD_REQUEST,
                    message: 'Booking Unsuccessful',
                    data: []
                }
            };

            const dataForServer = {
                car: fullCarObj._id,
                date: payload.date,
                startTime: payload.startTime,
                additionalInfo: payload.additionalInfo,
                user: userObj?._id
            };

            const booking = await Booking.create([dataForServer], { session });
            ;
            const populatedBooking = await booking[0].populate('car user');

            if (!booking) {
                return {
                    success: false,
                    statusCode: httpStatus.BAD_REQUEST,
                    message: 'Booking Unsuccessful',
                    data: []
                };
            };

            await session.commitTransaction();
            await session.endSession();

            return {
                success: true,
                statusCode: httpStatus.OK,
                message: 'Car booked successfully',
                data: populatedBooking
            }

        } catch (error) {
            await session.abortTransaction();
            await session.endSession();
            next(error)
        };

    } else {
        return {
            success: false,
            statusCode: httpStatus.BAD_REQUEST,
            message: 'Invalid Date.',
            data: []
        }
    }

} //end


export const BookingServices = {
    createBookingIntoDb,
};