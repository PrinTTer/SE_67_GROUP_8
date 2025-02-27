import express from "express";
import { registerCourse } from "../controllers/course.controller";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";

export default (router: express.Router) =>{
    router.post("/businesses/:businessId/courses" , isAuthenticated ,registerCourse);
}