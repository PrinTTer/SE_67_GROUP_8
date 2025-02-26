import { get } from "lodash";
import { getUsers , deleteUserById, getUserById, updateUserById } from "../models/users";
import express from "express";

export const getAllUsers = async (req:express.Request , res:express.Response):Promise<any> => {
    try {
        const users = await getUsers();
        return res.status(200).json(users);
    } catch(err) {
        console.log(err);
        return res.sendStatus(400);
    }
}

export const getUser = async (req:express.Request , res:express.Response):Promise<any> => {
    try {
        const currentUserId:string = get(req , 'identity._id');
        const user = await getUserById(currentUserId);

        return res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}

export const updateUser = async (req:express.Request , res:express.Response):Promise<any> => {
    try {
        const { email , password , firstName , lastName , address , phoneNumber , role } = req.body;
        const currentUserId:string = get(req , 'identity._id');

        if(!email || !password || !firstName || !lastName || !phoneNumber || !role ){
            return res.sendStatus(400);
        }

         const user = await updateUserById(currentUserId , {
            email : email,
            firstName : firstName,
            lastName : lastName,
            address : address,
            phoneNumber : phoneNumber,
            role : role,
         })

         return res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}

export const deleteUser = async (req:express.Request , res:express.Response):Promise<any> => {
    try {
        const {id} = req.params;
        const deletedUser = await deleteUserById(id);

        return res.json(deletedUser);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}
