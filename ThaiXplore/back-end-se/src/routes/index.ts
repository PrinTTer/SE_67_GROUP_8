import express from "express";
import authentication from "./authentication.routes";
import users from "./users.routes";
import businesses from "./business.routes";
import rooms from "./room.routes";
import businessDetail from "./businessDetail.routes";
import events from "./event.routes";
import bookings from "./booking.routes";
import packages from "./package.routes";
import quotations from "./quotation.routes";
import cars from "./car.routes";
import courses from "./course.routes";

const router = express.Router();

export default () => {
    authentication(router);
    users(router);
    businesses(router);
    rooms(router);
    businessDetail(router);
    events(router);
    bookings(router);
    packages(router);
    quotations(router);
    cars(router);
    courses(router);

    return router;
}