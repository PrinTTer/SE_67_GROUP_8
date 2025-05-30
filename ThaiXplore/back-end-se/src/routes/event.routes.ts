import { deleteEventImage, deleteEvents, getEvent, registerEvent, updateEvents, uploadEventImages } from "../controllers/event.controller";
import express from "express";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";
import { upload } from "../middlewares/uploadFile.middleware";

export default (router:express.Router) => {
    router.get("/events/:eventId" , isAuthenticated , getEvent);
    router.post("/businesses/:businessId/events" , isAuthenticated , registerEvent);
    router.delete("/events/:eventId" , isAuthenticated , deleteEvents);
    router.put("/events/:eventId" , isAuthenticated , updateEvents);
    router.post("/events/:eventId/images",isAuthenticated, upload.array("files" , 6) , uploadEventImages);
    router.delete("/events/:eventId/images/:index",isAuthenticated , deleteEventImage);
}