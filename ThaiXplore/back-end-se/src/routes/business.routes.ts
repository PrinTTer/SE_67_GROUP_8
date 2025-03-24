import express from "express";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";
import { getMyAllBusinesses, getAllBusinesses, getBusinesses, registerBusiness, getBusinessesByCategory, updateBusiness, deleteBusiness, uploadBusinessImages, deleteBusinessImages, uploadBusinessDocuments, deleteBusinessDocuments } from "../controllers/business.controller";
import { upload } from "../middlewares/uploadFile.middleware";

export default (router: express.Router) => {
    router.post('/businesses' , isAuthenticated , upload.array("files" , 10) , registerBusiness);
    router.put('/businesses/:businessId' , isAuthenticated , updateBusiness);
    router.post('/businesses/:businessId/images' , isAuthenticated , upload.array("files" , 6) , uploadBusinessImages);
    router.post('/businesses/:businessId/documents' , isAuthenticated ,upload.array("files" , 6) , uploadBusinessDocuments);
    router.get('/my-businesses' , isAuthenticated , getMyAllBusinesses);
    router.get('/businesses/:businessId' , getBusinesses);
    router.get('/businesses' , getAllBusinesses);
    router.get('/businesses/categories/:category' , getBusinessesByCategory);
    router.delete('/businesses/:businessId',isAuthenticated , deleteBusiness);
    router.delete('/businesses/:businessId/images/:index',isAuthenticated , deleteBusinessImages);
    router.delete('/businesses/:businessId/documents/:index' , isAuthenticated , deleteBusinessDocuments);
}