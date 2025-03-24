import express from "express";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";
import { getUserBooking, normalBooking, packageBooking } from "../controllers/booking.controller";

export default (router: express.Router) => {
    router.post("/bookings" , isAuthenticated , normalBooking);
    router.post("/bookings-package/:userPackageId" , isAuthenticated , packageBooking);
    router.get("/bookings" , isAuthenticated , getUserBooking);
}