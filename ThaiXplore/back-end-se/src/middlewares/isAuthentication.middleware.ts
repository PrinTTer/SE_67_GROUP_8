import { merge } from 'lodash';
import { getUserBySessionToken } from '../models/users';
import express from "express";

export const isAuthenticated = async (req:express.Request , res:express.Response , next:express.NextFunction):Promise<any> =>{
    try{
        const sessionToken = req.cookies['token'];

        if(!sessionToken) {
            return res.sendStatus(403);
        }

        const exitingUser = await getUserBySessionToken(sessionToken);

        if(!exitingUser){
            return res.sendStatus(403);
        }

        merge(req , {identity: exitingUser});

        return next();
    }catch(err){
        console.log(err);
        return res.sendStatus(400);
    }
}


