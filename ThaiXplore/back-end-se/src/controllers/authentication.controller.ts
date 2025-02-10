import express from "express";
import {random , authentication} from "../helpers/encryption";
import { getUserByEmail , createUser } from "../models/users";

export const login = async (req:express.Request , res:express.Response):Promise<any> => {
    try {
        const {email , password} = req.body;
        if(!email || !password) {
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        if(!user) {
            return res.sendStatus(400);
        }

        const expectedHash = authentication(user.authentication.salt , password);
        if(user.authentication.password !== expectedHash){
            return res.sendStatus(403);
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt , user._id.toString());

        await user.save();

        res.cookie('token' , user.authentication.sessionToken, { domain : 'localhost' , path : '/' });

        return res.status(200).json(user).end();
    }catch(err){
        console.log();
        return res.sendStatus(400);
    }
}

export const register = async (req:express.Request , res:express.Response):Promise<any> => {
    try {
        const { email , password , firstName , lastName , address , phoneNumber , role } = req.body;

        if(!email || !password || !firstName || !lastName || !phoneNumber || !role ){
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);
        if(existingUser){
            return res.sendStatus(400);
        }

        const dateCreate = Date.now();
        const salt = random();
        const user = await createUser({
            email,
            authentication: {
                password : authentication(salt , password),
                salt
            },
            firstName,
            lastName,
            phoneNumber,
            role,
            dateCreate,
        });

        return res.status(200).json(user).end();
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
} 
