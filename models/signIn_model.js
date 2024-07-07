import mongoose, { Schema } from "mongoose";
import { Schema, Types, model } from "mongoose";



export const signInSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    signUpId: {type:Types.ObjectId, ref: 'signUp', required:true}
}, {
    timestamps: true
}
);