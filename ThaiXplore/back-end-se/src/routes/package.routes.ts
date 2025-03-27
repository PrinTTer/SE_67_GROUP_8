import express from "express";
import { deletePackageImage, deletePackages, getAllPackages, getPackage, registerPackage, uploadPackageImages ,getAllPackagesbyBussinessId ,updatePackage} from "../controllers/package.controller";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";
import { upload } from "../middlewares/uploadFile.middleware";

export default (router: express.Router) => {
    router.get("/packages" , getAllPackages);
    router.get("/packages/:packageId" , getPackage);
    router.get("/packages-details/:packageId" , allDetailPackages);
    router.post("/businesses/:businessId/packages" , isAuthenticated , registerPackage);
    router.post("/packages/:packageId/images", isAuthenticated , upload.array("files" , 6) , uploadPackageImages);
    router.delete("/packages/:packageId" , isAuthenticated , deletePackages);
    router.delete("/packages/:packageId/images/:index", isAuthenticated , deletePackageImage);
    router.get("/packages/business/:businessId", getAllPackagesbyBussinessId);
    router.put('/packages/:packageId', isAuthenticated,updatePackage);

}