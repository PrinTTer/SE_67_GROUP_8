import express from "express";
import { get } from "lodash";
import { createEvent, deleteEvent ,getEventById,updateEvent} from "../models/event";
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

export const updateEvents = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
      const { eventId } = req.params;
      const { ticketType, price, quantity, eventDate, start, end } = req.body;
      const currentUserId: string = get(req, "identity._id");
  
      const user = await getUserById(currentUserId);
  
      if (user.role !== "entrepreneur") {
        return res.sendStatus(401);
      }
  
      if (!eventId) {
        return res.sendStatus(400);
      }
  
      const updatedEvent = await updateEvent(eventId, {
        ticketType,
        price,
        quantity,
        eventDate,
        start,
        end,
      });
  
      return res.status(200).json(updatedEvent);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

  export const getEvent = async (req:express.Request , res:express.Response):Promise<any> => {
    try {
      const { eventId } = req.params;
      const currentUserId:string = get(req, "identity._id");
      const user = await getUserById(currentUserId);
  
      const events = await getEventById(eventId);
  
      return res.status(200).json(events);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }