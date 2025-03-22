import express from "express";
import { deletePackageImage, deletePackages, registerPackage, uploadPackageImages } from "../controllers/package.controller";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";
import { upload } from "../middlewares/uploadFile.middleware";

export default (router: express.Router) => {
    router.post("/businesses/:businessId/packages" , isAuthenticated , registerPackage);
    router.delete("/packages/:packageId" , isAuthenticated , deletePackages);
    router.post("/packages/:packageId/images", isAuthenticated , upload.array("images" , 6) , uploadPackageImages);
    router.delete("/packages/:packageId/images/:index", isAuthenticated , deletePackageImage);
}