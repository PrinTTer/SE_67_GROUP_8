import { upload } from "../middlewares/uploadFile.middleware";
import { getAllUsers , deleteUser, getUser, updateUser, updateUserPassword, updateUserEmail, uploadUserProfileImage, getUserProfileImage, buyPackages, deleteUserByAdmin, updateUserByAdmin } from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";
import { isOwner } from "../middlewares/isOwner.middleware";
import express from "express";

export default (router:express.Router) => {
    router.get('/all-users' ,isAuthenticated, getAllUsers);
    router.get('/users' , isAuthenticated , getUser);
    router.get('/users/image' , isAuthenticated , getUserProfileImage);
    router.delete('/users' ,isAuthenticated , deleteUser);
    router.delete('/users/:id',isAuthenticated ,deleteUserByAdmin);
    router.put('/users' , isAuthenticated , updateUser);
    router.put('/users/change-password', isAuthenticated , updateUserPassword);
    router.put('/users/change-email', isAuthenticated , updateUserEmail);
    router.put('/users/upload-profile' , isAuthenticated , upload.single('images') , uploadUserProfileImage);
    router.post('/users/packages' , isAuthenticated , buyPackages);
    router.put('/users/:id' , isAuthenticated , updateUserByAdmin);
};