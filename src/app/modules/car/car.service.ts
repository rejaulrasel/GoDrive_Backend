import { NextFunction } from "express";
import { TCar } from "./car.interface";
import Car from "./car.model";
import httpStatus from "http-status";

async function createCarIntoDb(payload: TCar, next: NextFunction) {
  try {
    const newCar = await Car.create(payload);
    if (newCar) {
      return {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Car created successfully",
        data: newCar,
      };
    }
  } catch (error) {
    next(error);
  }
} //end;

async function getAllCarFromDb(
  query: Record<string, unknown>,
  next: NextFunction,
) {
  let searchTerm: string | null = null;
  let location: string | null = null;
  let color: string | null = null;
  let minPrice: number | null = null;
  let maxPrice: number | null = null;
  let sortOrder: "asc" | "desc" = "asc";

  if (query?.searchTerm) searchTerm = query.searchTerm as string;
  if (query?.location) location = query.location as string;
  if (query?.color) color = query.color as string;
  if (query?.minPrice) minPrice = Number(query.minPrice);
  if (query?.maxPrice) maxPrice = Number(query.maxPrice);
  if (query?.sortOrder) sortOrder = query.sortOrder === "desc" ? "desc" : "asc";

  const filter: Record<string, unknown> = {};
  filter.isDeleted = false;

  if (searchTerm) {
    filter.$or = [
      { name: { $regex: searchTerm, $options: "i" } },
      { location: { $regex: searchTerm, $options: "i" } },
    ];
  }

  if (location) {
    filter.location = location.charAt(0).toUpperCase() + location.slice(1);
  }
  if (color) {
    filter.color = color.charAt(0).toUpperCase() + color.slice(1);
  }

  if (minPrice !== null && maxPrice !== null) {
    filter.pricePerHour = { $gte: minPrice, $lte: maxPrice };
  } else if (minPrice !== null) {
    filter.pricePerHour = { $gte: minPrice };
  } else if (maxPrice !== null) {
    filter.pricePerHour = { $lte: maxPrice };
  }

  try {
    const result = await Car.find(filter).sort({ pricePerHour: sortOrder });
    if (result) {
      return {
        success: true,
        statusCode: 200,
        message: "Cars retrieved successfully",
        data: result,
      };
    } else {
      return {
        success: false,
        statusCode: 404,
        message: "No Data Found",
        data: [],
      };
    }
  } catch (error) {
    next(error);
  }
} //end;

async function getSpecificCarFromDb(query: string, next: NextFunction) {
  try {
    const car = await Car.findOne({ _id: query, isDeleted: false });
    if (car) {
      return {
        success: true,
        statusCode: 200,
        message: "A Car retrieved successfully",
        data: car,
      };
    } else {
      return {
        success: false,
        statusCode: 404,
        message: "No Data Found",
        data: [],
      };
    }
  } catch (error) {
    next(error);
  }
} //end;

async function updateSpecificCarIntoDb(
  query: string,
  payload: TCar,
  next: NextFunction,
) {
  try {
    const updatedData = await Car.findByIdAndUpdate(query, payload, {
      new: true,
    });
    if (updatedData) {
      return {
        success: true,
        statusCode: 200,
        message: "Car updated successfully",
        data: updatedData,
      };
    } else {
      return {
        success: false,
        statusCode: 404,
        message: "No Data Found",
        data: [],
      };
    }
  } catch (error) {
    next(error);
  }
} //end;

async function deleteACarFromDb(query: string, next: NextFunction) {
  try {
    const dataAfterDelete = await Car.findByIdAndUpdate(
      query,
      { isDeleted: true },
      { new: true },
    );
    if (dataAfterDelete) {
      return {
        success: true,
        statusCode: 200,
        message: "Car Deleted successfully",
        data: dataAfterDelete,
      };
    } else {
      return {
        success: false,
        statusCode: 404,
        message: "Invalid ID",
        data: [],
      };
    }
  } catch (error) {
    next(error);
  }
} //end;

export const CarServices = {
  createCarIntoDb,
  getAllCarFromDb,
  getSpecificCarFromDb,
  updateSpecificCarIntoDb,
  deleteACarFromDb,
};
