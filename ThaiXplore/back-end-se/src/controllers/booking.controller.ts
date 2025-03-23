import express from "express";
import { get } from "lodash";
import { getPackageInUser, getUserById, updateUserPackage } from "../models/users";
import { bookingModel, getBookingByUserId } from "../models/booking";
import { BusinessCategoryFactory } from "../factory/BusinessCategoryFactory";
import { getBusinessById } from "../models/business";
import { formatDateToDate } from "../helpers/dateFormat";
import { getPackageById } from "../models/package";
import { findServicesDetailsById, updateRemainingAmountById } from "../models/quotation";

export const normalBooking = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const { businessId, status, bookingTransaction, description, bookingType } = req.body;
        const bookingDetail: Array<any> = req.body.bookingDetail;
        const currentUserId: string = get(req, 'identity._id');

        const user = await getUserById(currentUserId);

        if (!businessId || !status || !bookingTransaction || !bookingDetail || !bookingType) {
            return res.sendStatus(400);
        }
        
        const bookingDate = Date.now();

        // Create booking object.
        const booking = new bookingModel({
            userId: currentUserId,
            businessId,
            bookingDate,
            status,
            bookingType,
            bookingTransaction,
            description,
            totalPrice: 0,
            bookingDetail: []
        });

        // Booking logic for normal booking, one booking for one business but many services.
        if (bookingType === "normal") {
            const business = await getBusinessById(businessId);
            const categoryStrategy = BusinessCategoryFactory.createCategory(business.category, businessId);

            await Promise.all(
                // Loop each services in bookingDetails.
                bookingDetail.map(async (values: any) => {
                    const { serviceId, amount } = values;
                    // Use same format date for use in bookedDates ---> YYYY-MM-DDT00:00:00.000Z.
                    const startDate = formatDateToDate(new Date(values.startDate));
                    const endDate = formatDateToDate(new Date(values.endDate));
                    try {
                        const service: any = await categoryStrategy.getProvideServiceById(serviceId);
                        booking.bookingDetail.push({
                            serviceId,
                            startDate: formatDateToDate(new Date(values.startDate)),
                            endDate: formatDateToDate(new Date(values.endDate)),
                            amount
                        });

                        // Add booking Date to each services.
                        while (startDate <= endDate) {
                            const BookedDates: any = await categoryStrategy.getProvideServiceBookedDates(serviceId, startDate);
                            if (!BookedDates[0]) {
                                await categoryStrategy.updateBookedDatesById(serviceId, startDate, 1 * amount, true);
                            } else {
                                const booked = BookedDates[0].bookedDates[0].booked;
                                await categoryStrategy.updateBookedDatesById(serviceId, startDate, booked + (1 * amount), false);
                            }
                            startDate.setDate(startDate.getDate() + 1);
                        }

                        booking.totalPrice += service.price * amount;
                    } catch (error) {
                        console.error(`Error fetching product with ID ${serviceId}:`, error);
                    }
                })
            );
        } else {
            return res.sendStatus(400);
        }

        // Save booking object to db.
        await booking.save();

        return res.status(201).json(booking);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}

export const packageBooking = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const { businessId, status, bookingTransaction, description, bookingType } = req.body;
        const { userPackageId } = req.params;
        const bookingDetail: Array<any> = req.body.bookingDetail;
        const currentUserId: string = get(req, 'identity._id');

        const user = await getUserById(currentUserId);

        if (!businessId || !status || !bookingTransaction || !bookingDetail || !bookingType || !userPackageId) {
            return res.sendStatus(400);
        }

        const business = await getBusinessById(businessId);

        if(!business) {
            return res.sendStatus(400);
        }

        const userPackages = await getPackageInUser(user._id.toString() , userPackageId);

        if(!userPackages){
            return res.sendStatus(400);
        }

        if(userPackages.packages[0].status === "used"){
            return res.sendStatus(400);
        }

        const packageModel = await getPackageById(userPackages.packages[0].packageId);
        const bookingDate = Date.now();

        const booking = new bookingModel({
            userId: currentUserId,
            businessId : business._id,
            bookingDate,
            status,
            bookingType,
            bookingTransaction,
            description,
            totalPrice: 0,
            bookingDetail: []
        });


        const serviceId = packageModel._id;
        const amount = 1;
        booking.bookingDetail.push({
            serviceId,
            startDate: formatDateToDate(new Date(bookingDetail[0].startDate)),
            endDate: formatDateToDate(new Date(bookingDetail[0].endDate)),
            amount
        });
        await Promise.all(
            // Loop each services in package.
            packageModel.services.map(async (values: any) => {
                const { businessId, serviceId, quotationId } = values;
                // Use same format date for use in bookedDates ---> YYYY-MM-DDT00:00:00.000Z.
                const startDate = formatDateToDate(new Date(bookingDetail[0].startDate));
                const endDate = formatDateToDate(new Date(bookingDetail[0].endDate));
                try {
                    const business = await getBusinessById(businessId);
                    const categoryStrategy = BusinessCategoryFactory.createCategory(business.category, businessId);

                    // Add booking Date to each services.
                    while (startDate <= endDate) {
                        const BookedDates: any = await categoryStrategy.getProvideServiceBookedDates(serviceId, startDate);
                        if (!BookedDates[0]) {
                            await categoryStrategy.updateBookedDatesById(serviceId, startDate, 1 * amount, true);
                        } else {
                            const booked = BookedDates[0].bookedDates[0].booked;
                            await categoryStrategy.updateBookedDatesById(serviceId, startDate, booked + (1 * amount), false);
                        }
                        startDate.setDate(startDate.getDate() + 1);
                    }
                    if(quotationId){
                        const servicesDetails = await findServicesDetailsById(quotationId , serviceId);
                        await updateRemainingAmountById(quotationId , servicesDetails.servicesDetails[0].remainingAmount-1, serviceId);
                    }
                } catch (error) {
                    console.error(`Error fetching product with ID ${serviceId}:`, error);
                }
            })
        );
        booking.totalPrice = packageModel.price * amount;

        // Save booking object to db.
        await updateUserPackage(user._id.toString() , "used" , userPackageId);
        await booking.save();

        return res.status(201).json(booking);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getUserBooking = async (req:express.Request , res:express.Response):Promise<any> => {
    try {
        const currentUserId:string = get(req , 'identity._id');
        const user = await getUserById(currentUserId);
        
        const bookings = await getBookingByUserId(user._id.toString());

        return res.status(200).json(bookings);
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}