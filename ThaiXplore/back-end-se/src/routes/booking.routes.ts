import express from "express";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";
import { normalBooking, packageBooking } from "../controllers/booking.controller";

export default (router: express.Router) => {
    router.post("/bookings" , isAuthenticated , normalBooking);
    router.post("/bookings-package/:userPackageId" , isAuthenticated , packageBooking);
}