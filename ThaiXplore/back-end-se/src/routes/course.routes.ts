import express from "express";
import { deleteCoures, registerCourse, updateCourses } from "../controllers/course.controller";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";


export default (router: express.Router) =>{
    router.post("/businesses/:businessId/courses" , isAuthenticated ,registerCourse);
    router.delete("/courses/:courseId" , isAuthenticated , deleteCoures);
    router.put("/courses/:courseId" , isAuthenticated , updateCourses);
    
}