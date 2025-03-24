import mongoose from "mongoose";

import { Document } from 'mongoose';

const QuotaionSchema = new mongoose.Schema({
    userId : {type : String , require : true},
    toBusinessId : {type : String , require : true},
    companyName : {type : String , require : true},
    email : {type : String , require : true},
    phoneNumber : {type : String , require : true},
    date : {type : Date , require : true},
    description : {type : String , require : true},
    status : {type : String , require : true},
    name : {type: String , require : true},
    address : {type: String , require : true},
    servicesDetails : [
        {
            serviceId : {type : String , require : true},
            quantity : {type : Number , require : true},
            price : {type : Number , require : true},
            amount : {type : Number , require : true},
            remainingAmount : {type : Number , require : true}, 
        }
    ],
    total : {type : Number , require : false},
    quotationTransaction : {
        transactionDate : {type : Date , require : true},
        paymentMethod : {type : String , require : true}
    }
});

export const QuotationModel = mongoose.model("Quotation" , QuotaionSchema);

export const findQuotationByUserId = (id:string) => QuotationModel.find({userId : id});

export const findQuotation = (id:string) => QuotationModel.findById(id);

export const findServicesDetailsById = (id:string , serviceId:string) => QuotationModel.findOne(
    {_id:id , "servicesDetails.serviceId" : serviceId},
    {"servicesDetails.$" : 1}
);

export const findPendedQuotaion = (userId:string) => QuotationModel.find({userId: userId});

export const findReceivedQuotation = (businessId:string) => QuotationModel.find({toBusinessId:businessId});

export const createQuotation = (values: Record<string , any>) => new QuotationModel(values).save().then((quotation)=>quotation.toObject());

export const deleteQuotation = (id:string) => QuotationModel.findByIdAndDelete(id);

export const updateQuotationById = (id:string , values:Record<string , any>) => QuotationModel.findByIdAndUpdate(id , values);

export const updateRemainingAmountById = (id: string , remainingAmount: number , serviceId: string) => QuotationModel.updateOne(
    {_id : id , "servicesDetails.serviceId" : serviceId },
    {$set : {"servicesDetails.$.remainingAmount" : remainingAmount}}
);

