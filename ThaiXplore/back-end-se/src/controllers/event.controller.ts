import express from "express";
import { get } from "lodash";
import { createEvent, deleteEvent, getEventById } from "../models/event";
import { getUserById } from "../models/users";
import path from "path";
import fs from "fs";

export const registerEvent = async (req:express.Request , res:express.Response):Promise <any> => {
    try {
        const { ticketType , price , quantity , eventDate , start , end } = req.body;
        const { businessId } = req.params;
        const currentUserId:string = get(req , 'identity._id');

        const user = await getUserById(currentUserId);

        if(user.role !== 'entrepreneur'){
            return res.sendStatus(401);
        }

        if(!ticketType || !quantity || !eventDate || !start || !price || !end || !businessId) {
            return res.sendStatus(400);
        }

        const event = await createEvent({
            businessId,
            ticketType,
            price,
            quantity,
            eventDate,
            start,
            end
        });

        return res.status(201).json(event);
    } catch(err) {
        console.log(err);
        return res.sendStatus(400);
    }
}

export const deleteEvents = async (req:express.Request , res:express.Response):Promise<any> => {
    try {
        const { eventId } = req.params;
        const currentUserId:string = get(req , 'identity._id');

        const user = await getUserById(currentUserId);

        if(user.role !== 'entrepreneur'){
            return res.sendStatus(401);
        }

        if (!eventId){
            return res.sendStatus(400);
        }

        const event = await deleteEvent(eventId);
        return res.status(200).json({message : "Successful deleted."});
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const uploadEventImages = async (req: express.Request, res: express.Response): Promise<any> => {
  try {
    const { eventId } = req.params;
    const currentUserId: string = get(req, 'identity._id');
    const user = await getUserById(currentUserId);
    const images = req.files;
    if (user.role !== 'entrepreneur') {
      return res.sendStatus(401);
    }

    if (!images) {
      return res.sendStatus(400);
    }

    const event = await getEventById(eventId);

    (images as Express.Multer.File[]).map((image, index) => {
        event.media.push(image.filename);
    });

    await event.save();

    return res.status(201).json(event);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const deleteEventImage = async (req:express.Request , res:express.Response):Promise<any> => {
    try {
        const {index , eventId} = req.params;
        const currentUserId:string = get(req , 'identity._id');
        const user = await getUserById(currentUserId);

        if(user.role !== 'entrepreneur'){
            return res.sendStatus(401);
        }

        const event = await getEventById(eventId);
        if(parseInt(index)-1 > event.media.length && parseInt(index)-1 < 0 || event.media.length === 0) {
            return res.sendStatus(400);
        }

        const filePath = path.resolve(__dirname, "../../public/uploads/services/events", event.media[parseInt(index) - 1]);
        fs.unlink(filePath , (err) => {
            if(err) {
                return res.sendStatus(500);
            }
        });

        event.media = event.media.filter((image , idx) => idx != parseInt(index) - 1);
        await event.save();

        return res.status(200).json(event);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}