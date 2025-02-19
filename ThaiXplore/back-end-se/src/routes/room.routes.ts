import express from "express";
import { registerRoom } from "../controllers/room.controller";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";

export default (router: express.Router) => {
    router.post("/rooms/:businessId" , isAuthenticated , registerRoom);
}