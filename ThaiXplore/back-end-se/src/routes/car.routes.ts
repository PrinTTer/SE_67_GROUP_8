import express from "express";
import { registerCar } from "../controllers/car.controller";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";

export default (router: express.Router) =>{
    router.post("/cars/:businessId" , isAuthenticated ,registerCar);
}