import express from "express";
import { get } from 'lodash';
import {createBusiness, deletBusinessById, getBusiness, getBusinessByCategory, getBusinessById, getBusinessByuserId, updateBusinessById} from "../models/business";
import { getUserById } from "../models/users";
import { BusinessCategoryFactory } from "../factory/BusinessCategoryFactory";
import path from "path";
import fs from "fs";

export const registerBusiness = async (req: express.Request , res: express.Response):Promise <any> => {
    try {
        const { businessName , description , address , phoneNumber , email , category , verify} = req.body;
        const currentUserId:string = get(req , 'identity._id');

        const user = await getUserById(currentUserId);

        if(user.role !== 'entrepreneur'){
            return res.sendStatus(401);
        }

        if (!businessName || !description || !address || !phoneNumber || !email || !category || !verify) {
            return res.sendStatus(400);
        }

        const dateCreate = Date.now();

        const business = await createBusiness({
            userId : user._id,
            currentUserId,
            businessName,
            description,
            address,
            phoneNumber,
            email,
            category,
            verify,
            dateCreate : dateCreate
        });

        return res.status(201).json(business);
    } catch(err) {
        console.log(err);
        return res.sendStatus(400);
    }
};

export const getMyAllBusinesses = async (req:express.Request , res:express.Response):Promise <any> => {
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

export const getBusinesses = async (req:express.Request , res:express.Response):Promise <any> => {
    try {
        const currentUserId:string = get(req , 'identity._id');
        const user = await getUserById(currentUserId);
        const { businessId } = req.params;
        
        const business = await getBusinessById(businessId);
        if (!business) {
            return res.sendStatus(400);
        }

        const categoryStrategy = BusinessCategoryFactory.createCategory(business.category , businessId);
        if (!categoryStrategy) {
            return res.sendStatus(400);
        }

        const businessDetail = await categoryStrategy.getBusinessDetails();
        const provideService = await categoryStrategy.getProvideService();


        return res.status(200).json({
            business,
            details : businessDetail,
            services : provideService
        });
    } catch(err) {
        console.log(err);
        return res.sendStatus(400);
    }
}

export const getAllBusinesses = async (req:express.Request , res:express.Response): Promise <any> => {
    try {
        const businesses = await getBusiness();
        return res.status(200).json(businesses);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}

export const getBusinessesByCategory = async (req: express.Request , res:express.Response): Promise<any> => {
    try {
        const { category } = req.params;
        const businesses = await getBusinessByCategory(category);

        return res.status(200).json(businesses);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}

export const updateBusiness = async (req: express.Request , res:express.Response): Promise<any> => {
    try {
        const { businessName , description , address , phoneNumber , email , media , followBusiness} = req.body;
        const { businessId } = req.params;
        const currentUserId:string = get(req , 'identity._id');
        const user = await getUserById(currentUserId);


        if(user.role !== 'entrepreneur'){
            return res.sendStatus(401);
        }

        if(!businessName || !description || !address || !phoneNumber || !email || !media){
            return res.sendStatus(400);
        }

        const business = await updateBusinessById(businessId,{
            businessName , 
            description , 
            address , 
            phoneNumber , 
            email,
            media : media,
            followBusiness : followBusiness
        });

        return res.status(200).json(business);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteBusiness = async (req: express.Request , res: express.Response):Promise<any> => {
    try {
        const { businessId } = req.params;
        const currentUserId:string = get(req , 'identity._id');
        const user = await getUserById(currentUserId);

        if(user.role !== 'entrepreneur'){
            return res.sendStatus(401);
        }

        const business = await deletBusinessById(businessId);
        return res.status(200).json(business);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const uploadBusinessImages = async (req:express.Request , res:express.Response):Promise<any> => {
    try {
        const { businessId } = req.params;
        const currentUserId:string = get(req , 'identity._id');
        const user = await getUserById(currentUserId);
        const images = req.files;
        if(user.role !== 'entrepreneur'){
            return res.sendStatus(401);
        }

        if(!images) {
            return res.sendStatus(400);
        }

        const business = await getBusinessById(businessId);
    
        (images as Express.Multer.File[]).map((image , index) => {
            business.media.push(image.filename);
        });

        business.save();

        return res.status(200).json(business);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteBusinessImages = async (req:express.Request , res:express.Response):Promise<any> => {
    try {
        const {index , businessId} = req.params;
        const currentUserId:string = get(req , 'identity._id');
        const user = await getUserById(currentUserId);

        if(user.role !== 'entrepreneur'){
            return res.sendStatus(401);
        }

        const business = await getBusinessById(businessId);
        if(parseInt(index)-1 > business.media.length && parseInt(index)-1 < 0 || business.media.length === 0) {
            return res.sendStatus(400);
        }

        const filePath = path.resolve(__dirname, "../../public/uploads/businesses/images", business.media[parseInt(index) - 1]);
        fs.unlink(filePath , (err) => {
            if(err) {
                return res.sendStatus(400);
            }
        });

        business.media = business.media.filter((image , idx) => idx != parseInt(index) - 1);
        business.save();

        return res.status(200).json(business);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}


