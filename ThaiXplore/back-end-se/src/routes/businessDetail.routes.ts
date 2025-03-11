import express from "express";
import { registerBusinessDetail, updateBusinessDetail } from "../controllers/businessDetail.controller";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";

export default (router: express.Router) => {
    router.post("/businesses/:businessId/businessdetails" , isAuthenticated , registerBusinessDetail);
    router.put("/businessDetails/:businessDetailId" , isAuthenticated , updateBusinessDetail);
}