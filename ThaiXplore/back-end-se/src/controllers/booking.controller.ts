import express from "express";
import { get } from "lodash";
import { getUserById } from "../models/users";
import { bookingModel } from "../models/booking";
import { BusinessCategoryFactory } from "../factory/BusinessCategoryFactory";
import { getBusinessById } from "../models/business";
import { formatDateToDate } from "../helpers/dateFormat";
import { getPackageById } from "../models/package";

export const registerBooking = async (req: express.Request, res: express.Response): Promise<any> => {
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
                                await categoryStrategy.updateBookedDatesById(serviceId, startDate, 1 * amount , true);
                            } else {
                                const booked = BookedDates[0].bookedDates[0].booked;
                                await categoryStrategy.updateBookedDatesById(serviceId, startDate, booked + (1 * amount) , false);
                            }
                            startDate.setDate(startDate.getDate() + 1);
                        }

                        booking.totalPrice += service.price * amount;
                    } catch (error) {
                        console.error(`Error fetching product with ID ${serviceId}:`, error);
                    }
                })
            );
        }

        //Booking logic for package booking, One booking for one package.
        else if (bookingType === "package") {
            const { serviceId, amount } = bookingDetail[0];
            const packageModel = await getPackageById(serviceId);
            booking.bookingDetail.push({
                serviceId,
                startDate: formatDateToDate(new Date(bookingDetail[0].startDate)),
                endDate: formatDateToDate(new Date(bookingDetail[0].endDate)),
                amount
            });
            await Promise.all(
                // Loop each services in package.
                packageModel.services.map(async (values: any) => {
                    const { businessId, serviceId } = values;
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
                                await categoryStrategy.updateBookedDatesById(serviceId, startDate, 1 * amount , true);
                            } else {
                                const booked = BookedDates[0].bookedDates[0].booked;
                                await categoryStrategy.updateBookedDatesById(serviceId, startDate, booked + (1 * amount) , false);
                            }
                            startDate.setDate(startDate.getDate() + 1);
                        }

                    } catch (error) {
                        console.error(`Error fetching product with ID ${serviceId}:`, error);
                    }
                })
            );
            booking.totalPrice = packageModel.price * amount;
        }

        // Save booking object to db.
        await booking.save();

        return res.status(201).json(booking);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}