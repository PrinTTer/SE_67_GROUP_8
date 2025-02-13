import express from "express";
import { registerBusinessDetail } from "../controllers/businessDetail.controller";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";

export default (router: express.Router) => {
    router.post("/businessdetails/:businessId" , isAuthenticated , registerBusinessDetail)
}