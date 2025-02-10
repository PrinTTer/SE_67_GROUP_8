import express from "express";
import { get } from 'lodash';
import {createBusiness, getBusinessByuserId} from "../models/business";
import { getUserById } from "../models/users";

export const registerBusiness = async (req: express.Request , res: express.Response):Promise <any> => {
    try {
        const { businessName , description , address , phoneNumber , email , categories , verify} = req.body;
        const currentUserId:string = get(req , 'identity._id');

        const user = await getUserById(currentUserId);

        if(user.role !== 'entrepreneur'){
            return res.sendStatus(401);
        }

        if (!businessName || !description || !address || !phoneNumber || !email || !categories || !verify) {
            return res.sendStatus(400);
        }

        const business = await createBusiness({
            userId : user._id,
            currentUserId,
            businessName,
            description,
            address,
            phoneNumber,
            email,
            categories,
            verify,
        });

        return res.status(201).json(business);
    } catch(err) {
        console.log(err);
        return res.sendStatus(400);
    }
};

export const getAllBusiness = async (req:express.Request , res:express.Response):Promise <any> => {
    try {
        const currentUserId:string = get(req , 'identity._id');
        const user = await getUserById(currentUserId);

        if(user.role !== 'entrepreneur'){
            return res.sendStatus(401);
        }

        const businesses = await getBusinessByuserId(currentUserId);

        return res.status(200).json(businesses);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}