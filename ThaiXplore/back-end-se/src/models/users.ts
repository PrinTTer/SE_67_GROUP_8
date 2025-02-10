import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email : {type: String , require: true},
    authentication : {
        password : {type : String , require : true , select: false},
        salt : {type : String , require : false},
        sessionToken : {type : String , require : true , select : false}
    },
    firstName : {type : String , require : true},
    lastName : {type : String , require : true},
    address : {type : String , require : false},
    phoneNumber : {type : String , require : false},
    role : {type : String , require : true},
    dateCreate : {type : Date , require : true}
});

export const UserModel = mongoose.model("User" , UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email:string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken:string) => UserModel.findOne({
    'authentication.sessionToken' : sessionToken
}) 
export const getUserById = (id:string) => UserModel.findById(id);
export const createUser = (values:Record<string , any>) => new UserModel(values).save().then((user)=> user.toObject());
export const deleteUserById = (id:string) => UserModel.findOneAndDelete({_id : id});
export const updateUserById = (id:string , values:Record<string , any>) => UserModel.findByIdAndUpdate(id , values);

