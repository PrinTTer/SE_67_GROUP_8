import { getAllUsers , deleteUser, getUser, updateUser, updateUserPassword, updateUserEmail } from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";
import { isOwner } from "../middlewares/isOwner.middleware";
import express from "express";

export default (router:express.Router) => {
    router.get('/all-users' ,isAuthenticated, getAllUsers);
    router.delete('/users/:id' ,isAuthenticated, isOwner , deleteUser);
    router.get('/users' , isAuthenticated , getUser);
    router.put('/users' , isAuthenticated , updateUser);
    router.put('/users/change-password', isAuthenticated , updateUserPassword);
    router.put('/users/change-email', isAuthenticated , updateUserEmail);
};