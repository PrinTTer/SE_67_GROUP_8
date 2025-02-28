import { registerEvent } from "../controllers/event.controller";
import express from "express";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";

export default (router:express.Router) => {
    router.post("/businesses/:businessId/events" , isAuthenticated , registerEvent);
}