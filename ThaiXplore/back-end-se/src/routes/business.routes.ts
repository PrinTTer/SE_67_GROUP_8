import express from "express";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";
import { isOwner } from "../middlewares/isOwner.middleware";
import { getMyAllBusiness, getAllBusinesses, getMyBusiness, registerBusiness } from "../controllers/business.controller";

export default (router: express.Router) => {
    router.post('/businesses' , isAuthenticated , registerBusiness);
    router.get('/my-businesses' , isAuthenticated , getMyAllBusiness);
    router.get('/businesses/:businessId' , isAuthenticated , getMyBusiness);
    router.get('/businesses' , getAllBusinesses);
}