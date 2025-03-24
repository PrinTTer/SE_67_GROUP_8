import express from "express";
import { deleteCoures, deleteCourseImage, getCourse, registerCourse, updateCourses, uploadCourseImages } from "../controllers/course.controller";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";
import { upload } from "../middlewares/uploadFile.middleware";


export default (router: express.Router) =>{
    router.get("/courses/:courseId" , isAuthenticated , getCourse);
    router.post("/businesses/:businessId/courses" , isAuthenticated ,registerCourse);
    router.delete("/courses/:courseId" , isAuthenticated , deleteCoures);
    router.put("/courses/:courseId" , isAuthenticated , updateCourses);
    router.post("/courses/:courseId/images",isAuthenticated, upload.array("files" , 6) , uploadCourseImages);
    router.delete("/courses/:courseId/images/:index",isAuthenticated , deleteCourseImage);
}