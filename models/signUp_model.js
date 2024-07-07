import { Schema,model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

 const signUpSchema = new Schema ({
    fullname: {type:String, required:true},
    email:{type:String, required:true, unique:true},
    contact:{type:String},
    username:{type:String, required:true,unique:true},
    password: {type:String, required:true, unique:true}
},{
    timestamps:true
});

signUpSchema.plugin(toJSON);

// exporting the model
export const  signUpModel = model('signUp',signUpSchema);