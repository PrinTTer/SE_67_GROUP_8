import express from "express";
import { get } from "lodash";
import { getUserById } from "../models/users";
import { createQuotation, deleteQuotation, findQuotation } from "../models/quotation";

export const registerQuotation = async (req: express.Request , res: express.Response): Promise <any> => {
    try {
        const {businessId , companyName , email , phoneNumber , description , servicesDetail} = req.body;
        const currentUserId:string = get(req , 'identity._id');
        
        const user = await getUserById(currentUserId);

        if(user.role !== 'entrepreneur'){
            return res.sendStatus(401);
        }

        if(!businessId || !companyName || !email || !phoneNumber || !description || !servicesDetail){
            return res.sendStatus(400);
        }

        const date = Date.now();
        const transaction = {
            transactionDate : "",
            status : ""
        }
        const quotation = await createQuotation({
            userId : currentUserId,
            businessId,
            companyName, 
            email, 
            phoneNumber,
            date, 
            description,
            status : "", 
            servicesDetail,
            total : 0,
            quotationTransaction : transaction
        });

        return res.status(201).json(quotation);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}

export const deleteQuotations = async (req:express.Request , res:express.Response):Promise<any> => {
    try {
        const { quotationId } = req.params;
        const currentUserId:string = get(req , 'identity._id');
        
        const user = await getUserById(currentUserId);

        if(user.role !== 'entrepreneur'){
            return res.sendStatus(401);
        }

        if(!quotationId){
            return res.sendStatus(400);
        }

        await deleteQuotation(quotationId);

        return res.status(200).json({message : "Successful deleted."});
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getQuotation = async (req:express.Request , res:express.Response):Promise<any> => {
    try {
        const { quotationId } = req.params;
        const currentUserId:string = get(req , 'identity._id');
        
        const user = await getUserById(currentUserId);

        if(user.role !== 'entrepreneur'){
            return res.sendStatus(401);
        }

        if(!quotationId){
            return res.sendStatus(400);
        }

        const quotation = await findQuotation(quotationId);
        return res.status(200).json(quotation);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}