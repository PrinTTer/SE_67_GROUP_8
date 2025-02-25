import express from "express";
import { registerQuotation } from "../controllers/quotation.controller";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";

export default (router: express.Router) => {
    router.post("/quotation" , isAuthenticated , registerQuotation);
}