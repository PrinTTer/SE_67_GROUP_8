import { get } from "lodash";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null , './public/uploads');
    },
    filename: (req , file , cb) => {
        const currentUserId:string = get(req , 'identity._id');
        cb(null , currentUserId + '-' + file.originalname);
    }
});

export const upload = multer({ storage });

