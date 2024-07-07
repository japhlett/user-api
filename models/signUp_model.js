import mongoose from "mongoose";
import { Schema,model } from "mongoose";


export const signUpSchema = new Schema ({
    fullname: {type:String, required:true},
    email:{type:String, required:true, unique:true},
    contact:{type:String},
    username:{type:String, required:true,unique:true},
    password: {type:String, required:true, unique:true}
},{
    timestamps:true
});