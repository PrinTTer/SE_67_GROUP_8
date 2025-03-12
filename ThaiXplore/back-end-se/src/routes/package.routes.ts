import express from "express";
import { deletePackages, registerPackage } from "../controllers/package.controller";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";

export default (router: express.Router) => {
    router.post("/businesses/:businessId/packages" , isAuthenticated , registerPackage);
    router.delete("/packages/:packageId" , isAuthenticated , deletePackages);
}