import mongoose from "mongoose";

const QuotaionSchema = new mongoose.Schema({
    userId : {type : String , require : true},
    businessId : {type : String , require : true},
    companyName : {type : String , require : true},
    email : {type : String , require : true},
    phoneNumber : {type : String , require : true},
    date : {type : Date , require : true},
    description : {type : String , require : true},
    status : {type : String , require : true},
    servicesDetail : [
        {
            serviceId : {type : String , require : true},
            amount : {type : Number , require : true}
        }
    ],
    total : {type : Number , require : false},
    quotationTransaction : {
        transactionDate : {type : Date , require : true},
        paymentMethod : {type : String , require : true}
    }
});

export const QuotationModel = mongoose.model("Quotation" , QuotaionSchema);

export const findQuotation = (id:string) => QuotationModel.findById(id);

export const createQuotation = (values: Record<string , any>) => new QuotationModel(values).save().then((quotation)=>quotation.toObject());

export const deleteQuotation = (id:string) => QuotationModel.findByIdAndDelete(id);
