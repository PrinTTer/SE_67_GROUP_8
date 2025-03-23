import experss from "express";
import { getUserById } from "../models/users";
import { createBusinessDetail, updateBusinessDetailById } from "../models/businessDetail";
import { get } from "lodash";

export const registerBusinessDetail = async (req: experss.Request, res: experss.Response): Promise<any> => {
    try {
        const { informationName, details } = req.body;
        const { businessId } = req.params;
        const currentUserId:string = get(req , 'identity._id');

        const user = await getUserById(currentUserId);

        if (user.role !== 'entrepreneur') {
            return res.sendStatus(401);
        }

        if (!businessId || !informationName || !details) {
            return res.sendStatus(400);
        }

        const businessDetail = await createBusinessDetail({
            businessId,
            informationName,
            details,
        });

        return res.status(201).json(businessDetail);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}

export const updateBusinessDetail = async (req: experss.Request , res: experss.Response): Promise<any> => {
    try {   
        const { informationName , details } = req.body;
        const { businessDetailId } = req.params;
        const currentUserId:string = get(req , 'identity._id');

        const user = await getUserById(currentUserId);

        if (user.role !== 'entrepreneur') {
            return res.sendStatus(401);
        }

        const businessDetail = await updateBusinessDetailById(businessDetailId , {
            informationName,
            details
        });

        return res.status(201).json(businessDetail);
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}