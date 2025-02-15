import express from "express";
import { get } from "lodash";
import { getUserById } from "../models/users";
import { bookingModel } from "../models/booking";
import { BusinessCategoryFactory } from "../factory/BusinessCategoryFactory";
import { getBusinessById } from "../models/business";
import { formatDateToDate } from "../helpers/dateFormat";

export const registerBooking = async (req: express.Request , res: express.Response):Promise <any> => {
    try {
        const { businessId , status , bookingTransaction , description } = req.body;
        const bookingDetail: Array<any> = req.body.bookingDetail;
        const currentUserId:string = get(req , 'identity._id');

        const user = await getUserById(currentUserId);

        if(user.role !== 'entrepreneur'){
            return res.sendStatus(401);
        }

        if (!businessId || !status || !bookingTransaction || !bookingDetail) {
            return res.sendStatus(400);
        }

        const bookingDate = Date.now();

        const booking = new bookingModel({
            userId : currentUserId,
            businessId,
            bookingDate , 
            status,
            bookingTransaction,
            description,
            totalPrice : 0,
            bookingDetail : []
        });

        const business = await getBusinessById(businessId);
        const categoryStrategy = BusinessCategoryFactory.createCategory(business.category , businessId);

        await Promise.all(
            bookingDetail.map(async (values: any) => {
                const { serviceId , amount } = values;
                const startDate = formatDateToDate(new Date(values.startDate));
                const endDate = formatDateToDate(new Date(values.endDate));
                try {
                    const service:any = await categoryStrategy.getProvideServiceById(serviceId);
                    booking.bookingDetail.push({
                         serviceId,
                         startDate : formatDateToDate(new Date(values.startDate)),
                         endDate : formatDateToDate(new Date(values.endDate)),
                         amount 
                        });

                    while (startDate <= endDate) {
                        const BookedDates:any = await categoryStrategy.getProvideServiceBookedDates(serviceId , startDate);
                        if(!BookedDates[0]) {
                            await categoryStrategy.updateBookedDatesById(serviceId , startDate , 1*amount);
                        } else {
                            const booked = BookedDates[0].bookedDates[0].booked;
                            await categoryStrategy.updateBookedDatesById(serviceId , startDate , booked+(1*amount));
                        }
                        startDate.setDate(startDate.getDate()+1);
                    }

                    booking.totalPrice += service.price * amount;
                } catch (error) {
                    console.error(`Error fetching product with ID ${serviceId}:`, error);
                }
            })
        );

        await booking.save();

        return res.status(201).json(booking);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}