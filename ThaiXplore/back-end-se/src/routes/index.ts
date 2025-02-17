import express from "express";
import authentication from "./authentication.routes";
import users from "./users.routes";
import businesses from "./business.routes";
import rooms from "./room.routes";
import businessDetail from "./businessDetail.routes";
<<<<<<< HEAD
import events from "./event.routes";
import bookings from "./booking.routes";
import packages from "./package.routes";
=======
import cars from "./car.routes"
import courses from "./course.routes"
>>>>>>> main

const router = express.Router();

export default () => {
    authentication(router);
    users(router);
    businesses(router);
    rooms(router);
    businessDetail(router);
<<<<<<< HEAD
    events(router);
    bookings(router);
    packages(router);

=======
    cars(router)
    courses(router)
    
>>>>>>> main
    return router;
}