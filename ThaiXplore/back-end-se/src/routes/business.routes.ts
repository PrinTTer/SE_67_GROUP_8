import express from "express";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";
import { isOwner } from "../middlewares/isOwner.middleware";
import { getMyAllBusinesses, getAllBusinesses, getBusinesses, registerBusiness, getBusinessesByCategory } from "../controllers/business.controller";

export default (router: express.Router) => {
    router.post('/businesses' , isAuthenticated , registerBusiness);
    router.get('/my-businesses' , isAuthenticated , getMyAllBusinesses);
    router.get('/businesses/:businessId' , getBusinesses);
    router.get('/businesses' , getAllBusinesses);
    router.get('/businesses/category/:category' , getBusinessesByCategory);
}