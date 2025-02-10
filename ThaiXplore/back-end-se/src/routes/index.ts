import express from "express";
import authentication from "./authentication.routes";
import users from "./users.routes";
import businesses from "./business.routes";
import chats from "./chat.routes";


const router = express.Router();

export default () => {
    authentication(router);
    users(router);
    businesses(router);
    chats(router);
    
    return router;
}