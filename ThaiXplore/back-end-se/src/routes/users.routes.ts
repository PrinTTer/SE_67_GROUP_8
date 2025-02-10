import { getAllUsers , deleteUser } from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";
import { isOwner } from "../middlewares/isOwner.middleware";
import express from "express";

export default (router:express.Router) => {
    router.get('/users' ,isAuthenticated, getAllUsers);
    router.delete('/users/:id' ,isAuthenticated, isOwner , deleteUser);
};