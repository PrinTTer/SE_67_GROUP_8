import express from "express";
import { deleteCars, registerCar } from "../controllers/car.controller";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";

export default (router: express.Router) =>{
    router.post("/businesses/:businessId/cars" , isAuthenticated ,registerCar);
    router.delete("/cars/:carId" , isAuthenticated , deleteCars);
}