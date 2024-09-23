import { Router } from "express";
import Auth from "../../middlewares/auth";
import ValidationRequest from "../../middlewares/zodValidation";
import { BookingValidation } from "./booking.validation";
import { bookingControllers } from "./booking.controller";

const router = Router();

router.get('/', Auth('admin'), bookingControllers.getAllBookings);


router.post('/', Auth('user'), ValidationRequest(BookingValidation.createCarBookingValidationSchema), bookingControllers.createBooking);










router.get('/my-bookings', Auth('user'), bookingControllers.getUserSpecificBookings);

router.delete('/delete', Auth('admin'), bookingControllers.deleteCanceledBooking);

export const BookingRoutes = router;

// 