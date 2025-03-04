import { isAuthenticated } from "../middlewares/isAuthentication.middleware";
import { register , login, logout} from "../controllers/authentication.controller";
import express from "express";

export default (router:express.Router) => {
    router.post('/auth/register' , register);
    router.post('/auth/login' , login);
    router.post('/auth/logout' , isAuthenticated , logout);
};