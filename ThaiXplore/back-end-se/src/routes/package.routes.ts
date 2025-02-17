import express from "express";
import { registerPackage } from "../controllers/package.controller";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";

export default (router: express.Router) => {
    router.post("/packages/:businessId" , isAuthenticated , registerPackage);
}