import express from "express";
import { get } from "lodash";
import { getUserById } from "../models/users";
import { createCourse, deleteCoure } from "../models/course";

export const registerCourse = async (req:express.Request , res:express.Response):Promise<any> => {
    try {
        const { courseName , menuList , price } = req.body;
        const { businessId } = req.params;
        const currentUserId:string = get(req , 'identity._id');

        const user = await getUserById(currentUserId);

        if(user.role !== 'entrepreneur'){
            return res.sendStatus(401);
        }

        if(!businessId || !courseName || !menuList || !price ) {
            return res.sendStatus(400);
        }

        const room = await createCourse({
            businessId,
            courseName,
            menuList,
            price,
        });
         

        return res.status(201).json(room);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}

export const deleteCoures = async (req:express.Request , res:express.Response):Promise<any> => {
    try {
        const {courseId} = req.params;
        const currentUserId:string = get(req , 'identity._id');

        const user = await getUserById(currentUserId);

        if(user.role !== 'entrepreneur'){
            return res.sendStatus(401);
        }
        
        const course = await deleteCoure(courseId);
        return res.status(200).json({message : "Successful deleted."});
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}