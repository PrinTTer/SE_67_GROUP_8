import express from "express";
import { deleteQuotations, getQuotation, registerQuotation, updateQuotation } from "../controllers/quotation.controller";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";

export default (router: express.Router) => {
    router.post("/businesses/:fromBusinessId/quotations" , isAuthenticated , registerQuotation);
    router.delete("/quotations/:quotationId" , isAuthenticated , deleteQuotations);
    router.get("/quotations/:quotationId" , isAuthenticated , getQuotation);
    router.put("/quotations/:quotationId" , isAuthenticated , updateQuotation);
}