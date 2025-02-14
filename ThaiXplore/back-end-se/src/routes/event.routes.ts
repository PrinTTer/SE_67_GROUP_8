import { registerEvent } from "../controllers/event.controller";
import express from "express";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";

export default (router:express.Router) => {
    router.post("/events/:businessId" , isAuthenticated , registerEvent);
}