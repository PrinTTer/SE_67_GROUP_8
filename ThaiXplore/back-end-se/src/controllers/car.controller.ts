import express from "express";
import { get } from "lodash";
import { getUserById } from "../models/users";
import { createCar } from "../models/car";

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
