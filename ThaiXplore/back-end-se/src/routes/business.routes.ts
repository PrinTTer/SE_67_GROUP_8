import express from "express";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";
import { isOwner } from "../middlewares/isOwner.middleware";
import { getAllBusiness, registerBusiness } from "../controllers/business.controller";

export default (router: express.Router) => {
    router.post('/businesses' , isAuthenticated , registerBusiness);
    router.get('/businesses' , isAuthenticated , getAllBusiness);
}