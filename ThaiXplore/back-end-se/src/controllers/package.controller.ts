import express from "express";
import { get } from "lodash";
import { getUserById } from "../models/users";
import { createPackage, deletePackage, getPackageById, getPackages ,getPackagesByBusinessId} from "../models/package";
import path from "path";
import fs from "fs";


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

export const uploadPackageImages = async (req: express.Request, res: express.Response): Promise<any> => {
  try {
    const { packageId } = req.params;
    const currentUserId: string = get(req, 'identity._id');
    const user = await getUserById(currentUserId);
    const images = req.files;
    if (user.role !== 'entrepreneur') {
      return res.sendStatus(401);
    }

    if (!images) {
      return res.sendStatus(400);
    }

    const packages = await getPackageById(packageId);

    (images as Express.Multer.File[]).map((image, index) => {
        packages.media.push(image.filename);
    });

    await packages.save();

    return res.status(201).json(packages);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const deletePackageImage = async (req:express.Request , res:express.Response):Promise<any> => {
    try {
        const {index , packageId} = req.params;
        const currentUserId:string = get(req , 'identity._id');
        const user = await getUserById(currentUserId);

        if(user.role !== 'entrepreneur'){
            return res.sendStatus(401);
        }

        const packages = await getPackageById(packageId);
        if(parseInt(index)-1 > packages.media.length && parseInt(index)-1 < 0 || packages.media.length === 0) {
            return res.sendStatus(400);
        }

        const filePath = path.resolve(__dirname, "../../public/uploads/services/packages", packages.media[parseInt(index) - 1]);
        fs.unlink(filePath , (err) => {
            if(err) {
                return res.sendStatus(500);
            }
        });

        packages.media = packages.media.filter((image , idx) => idx != parseInt(index) - 1);
        await packages.save();

        return res.status(200).json(packages);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getAllPackages = async (req:express.Request , res:express.Response):Promise<any> => {
    try {
        const packages = await getPackages();

        return res.status(200).json(packages);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getPackage = async (req:express.Request , res:express.Response):Promise<any> => {
    try {
        const {packageId} = req.params;
        const packages = await getPackageById(packageId);

        return res.status(200).json(packages);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getAllPackagesbyBussinessId = async (
    req: express.Request,
    res: express.Response
  ): Promise<any> => {
    try {
      const { businessId } = req.params;
  
      if (!businessId) {
        return res.sendStatus(400);
      }
  
      const packages = await getPackagesByBusinessId(businessId);
  
      return res.status(200).json(packages);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };