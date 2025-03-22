import { deleteEventImage, deleteEvents, registerEvent, uploadEventImages } from "../controllers/event.controller";
import express from "express";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";
import { upload } from "../middlewares/uploadFile.middleware";

export default (router:express.Router) => {
    router.post("/businesses/:businessId/events" , isAuthenticated , registerEvent);
    router.delete("/events/:eventId" , isAuthenticated , deleteEvents);
    router.post("/events/:eventId/images" , isAuthenticated , upload.array("images" , 6) , uploadEventImages);
    router.delete("/events/:eventId/images/:index" , isAuthenticated , deleteEventImage);
}