import { get } from "lodash";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const {title} = req.body;
        const [model , category] = title.split("_");
        cb(null , `./public/uploads/${model}/${category}`);
    },
    filename: (req , file , cb) => {
        const currentUserId:string = get(req , 'identity._id');
        const { title } = req.body;
        cb(null , title + '-' + currentUserId + '-' + Date.now() + '-' + file.originalname);
    }
});

export const upload = multer({ storage });

