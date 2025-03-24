import express from "express";
import { get, values } from "lodash";
import { getUserById } from "../models/users";
import { createQuotation, deleteQuotation, findPendedQuotaion, findQuotation, findQuotationByUserId, findReceivedQuotation, updateQuotationById } from "../models/quotation";
import { getBusinessByuserId } from "../models/business";
import mongoose, { Document } from 'mongoose';

export const registerQuotation = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const { fromBusinessId } = req.params;
        const { toBusinessId, companyName, email, phoneNumber, description } = req.body;
        const servicesDetails: Array<any> = req.body.servicesDetails;
        const currentUserId: string = get(req, 'identity._id');

        const user = await getUserById(currentUserId);

        if (user.role !== 'entrepreneur') {
            return res.sendStatus(401);
        }

        if (!fromBusinessId || !toBusinessId || !companyName || !email || !phoneNumber || !description || !servicesDetails) {
            return res.sendStatus(400);
        }

        const date = Date.now();
        const transaction = {
            transactionDate: "",
            status: ""
        }
        const quotation = await createQuotation({
            userId: user._id,
            fromBusinessId,
            toBusinessId,
            companyName,
            email,
            phoneNumber,
            date,
            description,
            status: "pending",
            servicesDetails,
            total: 0,
            quotationTransaction: transaction
        });


        return res.status(201).json(quotation);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}

export const deleteQuotations = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const { quotationId } = req.params;
        const currentUserId: string = get(req, 'identity._id');

        const user = await getUserById(currentUserId);

        if (user.role !== 'entrepreneur') {
            return res.sendStatus(401);
        }

        if (!quotationId) {
            return res.sendStatus(400);
        }

        await deleteQuotation(quotationId);

        return res.status(200).json({ message: "Successful deleted." });
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getQuotation = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const { quotationId } = req.params;
        const currentUserId: string = get(req, 'identity._id');

        const user = await getUserById(currentUserId);

        if (user.role !== 'entrepreneur') {
            return res.sendStatus(401);
        }

        if (!quotationId) {
            return res.sendStatus(400);
        }

        const quotation = await findQuotation(quotationId);
        return res.status(200).json(quotation);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateQuotation = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const { quotationId } = req.params;
        const { companyName, email, phoneNumber, description, status, total, transaction } = req.body;
        const servicesDetails: Array<any> = req.body.servicesDetails;
        const currentUserId: string = get(req, 'identity._id');

        const user = await getUserById(currentUserId);

        if (user.role !== 'entrepreneur') {
            return res.sendStatus(401);
        }

        const date = Date.now();

        const quotation = await updateQuotationById(quotationId, {
            companyName: companyName,
            email: email,
            phoneNumber: phoneNumber,
            date: date,
            description: description,
            status: status,
            servicesDetails: servicesDetails,
            total: total,
            quotationTransaction: transaction
        });

        return res.status(201).json(quotation);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getQuotations = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const currentUserId: string = get(req, 'identity._id');

        const user = await getUserById(currentUserId);

        if (user.role !== 'entrepreneur') {
            return res.sendStatus(401);
        }

        const quotation = await findQuotationByUserId(user._id.toString());
        return res.status(200).json(quotation);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getReceivedQuotation = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const currentUserId: string = get(req, 'identity._id');

        const user = await getUserById(currentUserId);

        if (user.role !== 'entrepreneur') {
            return res.sendStatus(401);
        }

        const businesses = await getBusinessByuserId(user._id.toString());
        const quotations: Array<any> = [];

        await Promise.all(
            businesses.map(async (business) => {
                const quotation = await findReceivedQuotation(business._id.toString());
                if(quotation){
                    quotation.map((object , index) => {
                        quotations.push(object);
                    })
                }
            })
        );


        return res.status(200).send(quotations);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getPendedQuotation = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const currentUserId: string = get(req, 'identity._id');

        const user = await getUserById(currentUserId);

        if (user.role !== 'entrepreneur') {
            return res.sendStatus(401);
        }

        const quotations = await findPendedQuotaion(user._id.toString());

        return res.status(200).json(quotations);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}