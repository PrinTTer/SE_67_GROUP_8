import express from "express";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";
import { registerBooking } from "../controllers/booking.controller";

export default (router: express.Router) => {
    router.post("/bookings" , isAuthenticated , registerBooking);
}