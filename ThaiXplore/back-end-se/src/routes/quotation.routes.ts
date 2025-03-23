import express from "express";
import { deleteQuotations, getQuotation, getQuotations, registerQuotation, updateQuotation } from "../controllers/quotation.controller";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";

export default (router: express.Router) => {
    router.post("/businesses/:fromBusinessId/quotations" , isAuthenticated , registerQuotation);
    router.delete("/quotations/:quotationId" , isAuthenticated , deleteQuotations);
    router.get("/quotations/:quotationId" , isAuthenticated , getQuotation);
    router.get("/quotations" , isAuthenticated , getQuotations);
    router.put("/quotations/:quotationId" , isAuthenticated , updateQuotation);
}