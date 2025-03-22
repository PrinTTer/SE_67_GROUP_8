import express from "express";
import { deleteCarImage, deleteCars, registerCar, uploadCarImages } from "../controllers/car.controller";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";
import { upload } from "../middlewares/uploadFile.middleware";

export default (router: express.Router) =>{
    router.post("/businesses/:businessId/cars" , isAuthenticated ,registerCar);
    router.delete("/cars/:carId" , isAuthenticated , deleteCars);
    router.post("/cars/:carId/images" , isAuthenticated , upload.array("images" , 6) , uploadCarImages);
    router.delete("/cars/:carId/images/:index" , isAuthenticated , deleteCarImage);
}