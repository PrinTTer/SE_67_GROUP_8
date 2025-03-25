import express from "express";
import { get } from "lodash";
import { getUserById } from "../models/users";
import { createCourse, deleteCoure , getCourseById, updateCourse} from "../models/course";
import path from "path";
import fs from "fs";

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


export const updateCourses = async (req: express.Request, res: express.Response): Promise<any> => {
  try {
    const { courseId } = req.params;
    const { courseName, menuList, price } = req.body;
    const currentUserId: string = get(req, "identity._id");

    const user = await getUserById(currentUserId);

    if (user.role !== "entrepreneur") {
      return res.sendStatus(401);
    }

    if (!courseId) {
      return res.sendStatus(400);
    }

    const updatedCourse = await updateCourse(courseId, {
      courseName,
      menuList,
      price,
    });

    return res.status(200).json(updatedCourse);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getCourse = async (req:express.Request , res:express.Response):Promise<any> => {
  try {
    const { courseId } = req.params;
    const currentUserId:string = get(req, "identity._id");
    const user = await getUserById(currentUserId);

    const courses = await getCourseById(courseId);
    console.log(courses);

    return res.status(200).json(courses);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const uploadCourseImages = async (req: express.Request, res: express.Response): Promise<any> => {
  try {
    const { courseId } = req.params;
    const currentUserId: string = get(req, 'identity._id');
    const user = await getUserById(currentUserId);
    const images = req.files;

    if (user.role !== 'entrepreneur') {
      return res.sendStatus(401);
    }

    // if (!images) {
    //   return res.sendStatus(400);
    // }

    const courses = await getCourseById(courseId);

    console.log(courses);

    (images as Express.Multer.File[]).map((image, index) => {
      courses.media.push(image.filename);
    });

    await courses.save();

    return res.status(201).json(courses);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const deleteCourseImage = async (req:express.Request , res:express.Response):Promise<any> => {
    try {
        const {index , courseId} = req.params;
        const currentUserId:string = get(req , 'identity._id');
        const user = await getUserById(currentUserId);

        if(user.role !== 'entrepreneur'){
            return res.sendStatus(401);
        }

        const courses = await getCourseById(courseId);
        if(parseInt(index)-1 > courses.media.length && parseInt(index)-1 < 0 || courses.media.length === 0) {
            return res.sendStatus(400);
        }

        const filePath = path.resolve(__dirname, "../../public/uploads/services/courses", courses.media[parseInt(index) - 1]);
        fs.unlink(filePath , (err) => {
            if(err) {
                return res.sendStatus(500);
            }
        });

        courses.media = courses.media.filter((image , idx) => idx != parseInt(index) - 1);
        await courses.save();

        return res.status(200).json(courses);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}