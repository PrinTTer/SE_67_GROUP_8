import express from "express";
import { deleteQuotations, getQuotation, registerQuotation } from "../controllers/quotation.controller";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";

export default (router: express.Router) => {
    router.post("/quotations" , isAuthenticated , registerQuotation);
    router.delete("/quotations/:quotationId" , isAuthenticated , deleteQuotations);
    router.get("/quotations/:quotationId" , isAuthenticated , getQuotation);
}