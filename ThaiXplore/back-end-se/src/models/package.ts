import { values } from "lodash";
import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema({
    businessId : {type : String , require : true},
    title : {type : String , require : true},
    description : {type : String , require : true},
    media : {type : [String] , require : false},
    dateCreate : {type : Date , require : true},
    startDate : {type : Date , require : true},
    endDate : {type : Date , require : true},
    price : {type : Number  , require : true},
    totalPackage : {type : Number , require : true},
    services : [
        {
            quotationId : {type : String , require : true},
            serviceId : {type : String , require : true},
            businessId : {type : String , require : true}
        }
    ],
});

export const PackageModel = mongoose.model("Packages" , PackageSchema);

export const getPackages = () => PackageModel.find();
export const getPackagesByBusinessId = (businessId: String) => PackageModel.find({businessId : businessId});
export const getPackageById = (id: String) => PackageModel.findById(id);

export const createPackage = (values: Record<string , any>) => new PackageModel(values).save().then((pack) => pack.toObject());