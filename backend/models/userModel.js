import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    cartData:{type:Object, default:{}}
},{minimize:false})
// By default, Mongoose removes empty objects from documents so minimize: false means: Even if cartData is {}, it will be saved in MongoDB
// Avoid undefined issues in frontend

const userModel = mongoose.model.user || mongoose.model("user", userSchema);

export default userModel;