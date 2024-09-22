import { Router } from "express";
import { CarControllers } from "./car.controller";
import Auth from "../../middlewares/auth";
import ValidationRequest from "../../middlewares/zodValidation";
import { CarValidationSchema } from "./car.validation";

const router = Router();


router.post('/', Auth('admin'), ValidationRequest(CarValidationSchema.createCarValidationSchema), CarControllers.createCar);

router.get('/', CarControllers.getAllCar);


export const CarRoutes = router;