import express from "express";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";
import { isOwner } from "../middlewares/isOwner.middleware";
import { getMyAllBusinesses, getAllBusinesses, getBusinesses, registerBusiness, getBusinessesByCategory, updateBusiness, deleteBusiness } from "../controllers/business.controller";

export default (router: express.Router) => {
    router.post('/businesses' , isAuthenticated , registerBusiness);
    router.post('/businesses/:businessId' , isAuthenticated , updateBusiness);
    router.get('/my-businesses' , isAuthenticated , getMyAllBusinesses);
    router.get('/businesses/:businessId' , getBusinesses);
    router.get('/businesses' , getAllBusinesses);
    router.get('/businesses/category/:category' , getBusinessesByCategory);
    router.delete('/businesses/:businessId',isAuthenticated , deleteBusiness);
}