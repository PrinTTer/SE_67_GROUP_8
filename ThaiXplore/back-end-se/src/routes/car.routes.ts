import express from "express";
import { deleteCarImage, deleteCars, getCar, registerCar ,updateCars, uploadCarImages} from "../controllers/car.controller";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";
import { upload } from "../middlewares/uploadFile.middleware";

export default (router: express.Router) =>{
    router.get("/cars/:carId" , isAuthenticated , getCar);
    router.post("/businesses/:businessId/cars" , isAuthenticated ,registerCar);
    router.delete("/cars/:carId" , isAuthenticated , deleteCars);
    router.put("/cars/:carId" , isAuthenticated , updateCars);
    router.post("/cars/:carId/images",isAuthenticated, upload.array("files" , 6) , uploadCarImages);
    router.delete("/cars/:carId/images/:index",isAuthenticated , deleteCarImage);
}