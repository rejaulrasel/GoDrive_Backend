import { NextFunction, Request, Response } from "express";
import { CarServices } from "./car.service";

async function createCar(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await CarServices.createCarIntoDb(req.body, next);

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

async function getAllCar(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await CarServices.getAllCarFromDb(req.query, next);

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
} //end;

async function getSpecificCar(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await CarServices.getSpecificCarFromDb(req.params.id, next);

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
} //end;

async function returnCar(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await CarServices.returnCarFromDb(req.body, next);

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
} // end

async function updateSpecificCar(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await CarServices.updateSpecificCarIntoDb(
      req.params.id,
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

async function deleteACar(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await CarServices.deleteACarFromDb(req.params.id, next);

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

export const CarControllers = {
  createCar,
  getAllCar,
  getSpecificCar,
  updateSpecificCar,
  deleteACar,
  returnCar,
};
