import express from "express";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";
import { getMyAllBusinesses, getAllBusinesses, getBusinesses, registerBusiness, getBusinessesByCategory, updateBusiness, deleteBusiness, uploadBusinessImages, deleteBusinessImages } from "../controllers/business.controller";
import { upload } from "../middlewares/uploadFile.middleware";

export default (router: express.Router) => {
    router.post('/businesses' , isAuthenticated , registerBusiness);
    router.put('/businesses/:businessId' , isAuthenticated , updateBusiness);
    router.put('/businesses/:businessId/images' , isAuthenticated , upload.array("images" , 6) , uploadBusinessImages);
    router.get('/my-businesses' , isAuthenticated , getMyAllBusinesses);
    router.get('/businesses/:businessId' , getBusinesses);
    router.get('/businesses' , getAllBusinesses);
    router.get('/businesses/category/:category' , getBusinessesByCategory);
    router.delete('/businesses/:businessId',isAuthenticated , deleteBusiness);
    router.delete('/businesses/:businessId/images/:index',isAuthenticated , deleteBusinessImages);
}