import express from "express";
import { deleteCars, getCar, registerCar ,updateCars} from "../controllers/car.controller";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";

export default (router: express.Router) =>{
    router.get("/cars/:carId" , isAuthenticated , getCar);
    router.post("/businesses/:businessId/cars" , isAuthenticated ,registerCar);
    router.delete("/cars/:carId" , isAuthenticated , deleteCars);
    router.put("/cars/:carId" , isAuthenticated , updateCars);
}