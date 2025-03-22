import express from "express";
import { deleteCoures, deleteCourseImage, registerCourse, uploadCourseImages } from "../controllers/course.controller";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";
import { upload } from "../middlewares/uploadFile.middleware";

export default (router: express.Router) =>{
    router.post("/businesses/:businessId/courses" , isAuthenticated ,registerCourse);
    router.delete("/courses/:courseId" , isAuthenticated , deleteCoures);
    router.post("/courses/:courseId/images" , isAuthenticated , upload.array("images" , 6) ,uploadCourseImages);
    router.delete("/courses/:courseId/images/:index" , isAuthenticated , deleteCourseImage);
}