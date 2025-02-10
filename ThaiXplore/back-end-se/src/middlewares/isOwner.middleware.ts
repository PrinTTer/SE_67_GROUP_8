import { get } from 'lodash';
import { getUserBySessionToken } from '../models/users';
import express from "express";

export const isOwner = (req:express.Request , res:express.Response , next:express.NextFunction):any => {
    try {
        const {id} = req.params;
        const currentUserId:string = get(req , 'identity._id');

        if(!currentUserId) {
            return res.sendStatus(403);
        }

        if(currentUserId.toString() !== id){
            return res.sendStatus(403);
        }

        next();
    } catch (err){
        console.log(err);
        return res.sendStatus(400);
    }
};
