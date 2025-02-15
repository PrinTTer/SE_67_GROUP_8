import express from "express";
import authentication from "./authentication.routes";
import users from "./users.routes";
import businesses from "./business.routes";
import rooms from "./room.routes";
import businessDetail from "./businessDetail.routes";
import cars from "./car.routes"
import courses from "./course.routes"

const router = express.Router();

export default () => {
    authentication(router);
    users(router);
    businesses(router);
    rooms(router);
    businessDetail(router);
    cars(router)
    courses(router)
    
    return router;
}