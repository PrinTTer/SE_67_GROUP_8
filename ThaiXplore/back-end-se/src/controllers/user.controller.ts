import { get } from "lodash";
import { getUsers , deleteUserById, getUserById, updateUserById, getUserByEmail } from "../models/users";
import express from "express";
import { authentication } from "../helpers/encryption";

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
        const { firstName , lastName , address , phoneNumber , role } = req.body;
        const currentUserId:string = get(req , 'identity._id');

        if(!firstName || !lastName || !phoneNumber || !role ){
            return res.sendStatus(400);
        }

         const user = await updateUserById(currentUserId , {
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

export const updateUserEmail = async (req:express.Request , res:express.Response):Promise<any> => {
    try {
        const { newEmail , password } = req.body;
        const currentUserId:string = get(req , 'identity._id');

        const user = await getUserById(currentUserId).select('+authentication.salt +authentication.password');
        if(!newEmail || !password) {
            return res.sendStatus(400);
        }

        const expectedHash = authentication(user.authentication.salt , password);
        if(expectedHash !== user.authentication.password){
            return res.status(403).json({message: "The password is incorrect."});
        }

        const expectEmail = await getUserByEmail(newEmail);
        if(expectEmail) {
            return res.status(400).json({message: "This email address is already in use."});
        }


        user.email = newEmail;
        user.save();

        return res.status(200).json({message: "Your email has been changed successfully."});
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}

export const updateUserPassword = async (req:express.Request , res:express.Response):Promise<any> => {
    try {
        const { currentPassword , newPassword } = req.body;
        const currentUserId:string = get(req , 'identity._id');

        const user = await getUserById(currentUserId).select('+authentication.salt +authentication.password');
        if(!currentPassword || !newPassword) {
            return res.sendStatus(400);
        }

        const expectedHash = authentication(user.authentication.salt , currentPassword);
        if(expectedHash !== user.authentication.password){
            return res.status(403).json({message: "The original password is incorrect."});
        }

        user.authentication.password = authentication(user.authentication.salt , newPassword);
        user.save();

        return res.status(200).json({message: "Your password has been changed successfully."});
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
