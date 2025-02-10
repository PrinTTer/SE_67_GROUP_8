import { getUsers , deleteUserById } from "../models/users";
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
