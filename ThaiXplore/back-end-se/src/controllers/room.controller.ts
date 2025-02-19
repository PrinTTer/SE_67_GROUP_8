import express from "express";
import { get } from "lodash";
import { getUserById } from "../models/users";
import { createRoom } from "../models/room";

export const registerRoom = async (req:express.Request , res:express.Response):Promise<any> => {
    try {
        const { roomType , guestAmount , roomSize , price , facilities , totalRooms } = req.body;
        const { businessId } = req.params;
        const currentUserId:string = get(req , 'identity._id');

        const user = await getUserById(currentUserId);

        if(user.role !== 'entrepreneur'){
            return res.sendStatus(401);
        }

        if(!businessId || !roomType || !guestAmount || !roomSize || !price || !totalRooms) {
            return res.sendStatus(400);
        }

        const room = await createRoom({
            businessId,
            roomType,
            guestAmount,
            roomSize,
            price,
            facilities,
            totalRooms
        });
         

        return res.status(201).json(room);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}