import express from "express";
import { get } from "lodash";
import { getUserById } from "../models/users";
import { createQuotation } from "../models/quotation";

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