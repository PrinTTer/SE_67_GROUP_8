import express from "express";
import { deleteRooms, registerRoom, updateRooms } from "../controllers/room.controller";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";

export default (router: express.Router) => {
    router.post("/businesses/:businessId/rooms" , isAuthenticated , registerRoom);
    router.delete("/room/:roomId",isAuthenticated , deleteRooms);
    router.put("/rooms/:roomId" , isAuthenticated , updateRooms);
}