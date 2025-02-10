import express from "express";
import { get } from "lodash";
import { createChat, getChat } from "../models/chat";

export const createChatRoom = async (req:express.Request , res:express.Response): Promise <any>  => {
    try {
        const { withUserId , quotationId , dealStatus} = req.body;
        const currentUserId:string = get(req , 'identity._id');
        const createdAt = Date.now();
        if(!withUserId) {
            return res.sendStatus(400);
        }

        const chat = await createChat({
            userId : currentUserId,
            withUserId,
            quotationId,
            dealStatus,
            createdAt,
        });

        return res.status(201).json(chat);

    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}

export const getAllChatRoom = async (req:express.Request , res:express.Response): Promise <any> => {
    try {
        const chat = await getChat();
        return res.status(200).json(chat);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}