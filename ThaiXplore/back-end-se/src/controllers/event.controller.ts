import express from "express";
import { get } from "lodash";
import { createEvent } from "../models/event";
import { getUserById } from "../models/users";

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