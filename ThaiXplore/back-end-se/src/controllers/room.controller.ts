import express from "express";
import { get } from "lodash";
import { getUserById } from "../models/users";
import { createRoom, deleteRoom, getRoomById, updateRoom } from "../models/room";
import path from "path";
import fs from "fs";


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

export const deleteRooms = async (req:express.Request , res:express.Response):Promise<any> => {
    try {
        const { roomId } = req.params;

        const currentUserId:string = get(req , 'identity._id');
        const user = await getUserById(currentUserId);

        if(user.role !== 'entrepreneur'){
            return res.sendStatus(401);
        }
        
        if(!roomId) {
            return res.sendStatus(400);
        }

        await deleteRoom(roomId);
        return res.status(200).json({message : "Successful deleted."});
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateRooms = async (req:express.Request , res:express.Response):Promise<any> => {
    try {
        const { roomId } = req.params;
        const { roomType , guestAmount , roomSize , price , facilities , totalRooms } = req.body;

        const currentUserId:string = get(req , 'identity._id');

        const user = await getUserById(currentUserId);

        if(user.role !== 'entrepreneur'){
            return res.sendStatus(401);
        }

        if(!roomId) {
            return res.sendStatus(400);
        }

        const room = await updateRoom(roomId , {
            roomType,
            guestAmount,
            roomSize,
            price,
            facilities,
            totalRooms
        })

        return res.status(200).json(room);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const uploadRoomImages = async (req: express.Request, res: express.Response): Promise<any> => {
  try {
    const { roomId } = req.params;
    const currentUserId: string = get(req, 'identity._id');
    const user = await getUserById(currentUserId);
    const images = req.files;
    if (user.role !== 'entrepreneur') {
      return res.sendStatus(401);
    }

    // if (!images) {
    //   return res.sendStatus(400);
    // }

    const room = await getRoomById(roomId);

    (images as Express.Multer.File[]).map((image, index) => {
        room.media.push(image.filename);
    });

    await room.save();

    return res.status(201).json(room);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const deleteRoomImage = async (req:express.Request , res:express.Response):Promise<any> => {
    try {
        const {index , roomId} = req.params;
        const currentUserId:string = get(req , 'identity._id');
        const user = await getUserById(currentUserId);

        if(user.role !== 'entrepreneur'){
            return res.sendStatus(401);
        }

        const room = await getRoomById(roomId);
        if(parseInt(index)-1 > room.media.length && parseInt(index)-1 < 0 || room.media.length === 0) {
            return res.sendStatus(400);
        }

        const filePath = path.resolve(__dirname, "../../public/uploads/services/rooms", room.media[parseInt(index) - 1]);
        fs.unlink(filePath , (err) => {
            if(err) {
                return res.sendStatus(500);
            }
        });

        room.media = room.media.filter((image , idx) => idx != parseInt(index) - 1);
        await room.save();

        return res.status(200).json(room);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}