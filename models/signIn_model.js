import { Schema, Types, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const signInSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    signUpId: {type:Types.ObjectId, ref: 'signUp', required:true}
}, {
    timestamps: true
}
);

signInSchema.plugin(toJSON);


// exporting the model
export const  signInModel = model('signIn',signInSchema);