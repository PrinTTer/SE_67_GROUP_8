import express from "express";
import { deleteRoomImage, deleteRooms, registerRoom, updateRooms, uploadRoomImages } from "../controllers/room.controller";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";
import { upload } from "../middlewares/uploadFile.middleware";

export default (router: express.Router) => {
    router.post("/businesses/:businessId/rooms" , isAuthenticated , registerRoom);
    router.delete("/room/:roomId",isAuthenticated , deleteRooms);
    router.put("/rooms/:roomId" , isAuthenticated , updateRooms);
    router.post("/rooms/:roomId/images",isAuthenticated, upload.array("images" , 6) , uploadRoomImages);
    router.delete("/rooms/:roomId/images/:index",isAuthenticated , deleteRoomImage);
}