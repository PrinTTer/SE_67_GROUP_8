import express from "express";
import { createChatRoom, getAllChatRoom } from "../controllers/chat.controller";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";

export default (router:express.Router) => {
    router.post("/chats/" , isAuthenticated , createChatRoom);
    router.get("/chats/" , isAuthenticated , getAllChatRoom);
}