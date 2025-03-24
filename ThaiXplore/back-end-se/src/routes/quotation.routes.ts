import express from "express";
import { deleteQuotations, getPendedQuotation, getQuotation, getQuotations, getReceivedQuotation, registerQuotation, updateQuotation } from "../controllers/quotation.controller";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";

export default (router: express.Router) => {
    router.post("/quotations" , isAuthenticated , registerQuotation);
    router.delete("/quotations/:quotationId" , isAuthenticated , deleteQuotations);
    router.get("/quotations/:quotationId" , isAuthenticated , getQuotation);
    router.get("/quotations" , isAuthenticated , getQuotations);
    router.get("/quotations-pended" , isAuthenticated , getPendedQuotation);
    router.get("/quotations-received" , isAuthenticated , getReceivedQuotation);
    router.put("/quotations/:quotationId" , isAuthenticated , updateQuotation);
}