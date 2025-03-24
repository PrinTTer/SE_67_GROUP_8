import express from "express";
import { deleteCoures, getCourse, registerCourse, updateCourses } from "../controllers/course.controller";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";


export default (router: express.Router) =>{
    router.get("/courses/:courseId" , isAuthenticated , getCourse);
    router.post("/businesses/:businessId/courses" , isAuthenticated ,registerCourse);
    router.delete("/courses/:courseId" , isAuthenticated , deleteCoures);
    router.put("/courses/:courseId" , isAuthenticated , updateCourses);
    
}