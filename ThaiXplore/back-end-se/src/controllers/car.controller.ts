import express from "express";
import { get } from "lodash";
import { getUserById } from "models/users";

export const registerCar = async (req:express.Request , res:express.Response):Promise<any> => {
    try {
        const {carBrand,licensePlate ,amountSeat,price,totalCars} = req.body;
        const {businessId} = req.params;
        const currentUserId:string = get(req, 'identity._id');

        const user = await getUserById(currentUserId);






    }catch(err){
        console.log(err);
        return res.sendStatus(400);
    }
}