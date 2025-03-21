import express from "express";
import { get } from "lodash";
import { getUserById } from "../models/users";
import { createPackage, deletePackage } from "../models/package";

export const registerPackage = async (req: express.Request , res: express.Response):Promise<any> => {
    try {
        const { title , description , media , startDate , endDate , totalPackage , price , services , totalExpirationDate} = req.body;
        const { businessId } = req.params;
        const dateCreate = Date.now();

        const currentUserId:string = get(req , 'identity._id');
        const user = await getUserById(currentUserId);

        if(user.role !== 'entrepreneur'){
            return res.sendStatus(401);
        }

        if (!businessId || !title || !description || !startDate || !endDate || !totalPackage || !services || !price) {
            return res.sendStatus(400);
        }

        const packageModel = await createPackage({
            businessId , 
            title , 
            description , 
            media , 
            dateCreate ,
            startDate , 
            endDate ,
            totalExpirationDate , 
            price , 
            totalPackage ,
            services
        });

        return res.status(201).json(packageModel);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}

export const deletePackages = async (req:express.Request , res:express.Response):Promise<any> => {
    try {
        const { packageId } = req.params;
        const currentUserId:string = get(req , 'identity._id');
        const user = await getUserById(currentUserId);

        if(user.role !== 'entrepreneur'){
            return res.sendStatus(401);
        }

        if(!packageId){
            return res.sendStatus(400);
        }

        await deletePackage(packageId);
        return res.status(200).json({message: "Successful deleted."});
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}