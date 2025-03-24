import express from "express";
import { get } from "lodash";
import { getUserById } from "../models/users";
import { createCar, deleteCar ,getCarById,updateCar} from "../models/car";
import path from "path";
import fs from "fs";


export const registerCar = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { carBrand, licensePlate, amountSeat, price, totalCars } = req.body;
    const { businessId } = req.params;
    // console.log(businessId);
    const currentUserId: string = get(req, "identity._id");

    const user = await getUserById(currentUserId);

    if (user.role !== "entrepreneur") {
      return res.sendStatus(401);
    }

    if (!carBrand || !licensePlate || !amountSeat || !price || !totalCars) {
      return res.sendStatus(400);
    }

    const car = await createCar({
      businessId: businessId,
      carBrand,
      licensePlate,
      amountSeat,
      price,
      totalCars,
    });

    return res.status(201).json(car);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export const deleteCars = async (req: express.Request, res: express.Response): Promise<any> => {
  try {
    const { carId } = req.params;
    const currentUserId: string = get(req, "identity._id");
    const user = await getUserById(currentUserId);

    if (user.role !== "entrepreneur") {
      return res.sendStatus(401);
    }

    if (!carId) {
      return res.sendStatus(400);
    }

    const car = await deleteCar(carId);

    return res.status(200).json({ message: "Successful Deleted." });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
} 

export const updateCars = async (req: express.Request, res: express.Response): Promise<any> => {
  try {
    const { carId } = req.params;
    const { carBrand, licensePlate, amountSeat, price, totalCars } = req.body;

    const currentUserId:string = get(req, "identity._id");
    const user = await getUserById(currentUserId);

    if (user.role !== "entrepreneur") {
      return res.sendStatus(401);
    }

    if (!carId) {
      return res.sendStatus(400);
    }

    const car = await updateCar(carId, {
      carBrand,
      licensePlate,
      amountSeat,
      price,
      totalCars
    });
    console.log("Updating car with ID:", carId);

    return res.status(200).json(car);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getCar = async (req:express.Request , res:express.Response):Promise<any> => {
  try {
    const { carId } = req.params;
    const currentUserId:string = get(req, "identity._id");
    const user = await getUserById(currentUserId);

    const cars = await getCarById(carId);

    return res.status(200).json(cars);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const uploadCarImages = async (req: express.Request, res: express.Response): Promise<any> => {
  try {
    const { carId } = req.params;
    const currentUserId: string = get(req, 'identity._id');
    const user = await getUserById(currentUserId);
    const images = req.files;
    if (user.role !== 'entrepreneur') {
      return res.sendStatus(401);
    }

    if (!images) {
      return res.sendStatus(400);
    }

    const cars = await getCarById(carId);

    (images as Express.Multer.File[]).map((image, index) => {
      cars.media.push(image.filename);
    });

    await cars.save();

    return res.status(201).json(cars);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const deleteCarImage = async (req:express.Request , res:express.Response):Promise<any> => {
    try {
        const {index , carId} = req.params;
        const currentUserId:string = get(req , 'identity._id');
        const user = await getUserById(currentUserId);

        if(user.role !== 'entrepreneur'){
            return res.sendStatus(401);
        }

        const cars = await getCarById(carId);
        if(parseInt(index)-1 > cars.media.length && parseInt(index)-1 < 0 || cars.media.length === 0) {
            return res.sendStatus(400);
        }

        const filePath = path.resolve(__dirname, "../../public/uploads/services/cars", cars.media[parseInt(index) - 1]);
        fs.unlink(filePath , (err) => {
            if(err) {
                return res.sendStatus(500);
            }
        });

        cars.media = cars.media.filter((image , idx) => idx != parseInt(index) - 1);
        await cars.save();

        return res.status(200).json(cars);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}