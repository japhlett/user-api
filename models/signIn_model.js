import { Schema, Types, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const signInSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true},
    signUpId: {type: Schema.Types.ObjectId, ref: 'signUp'}
}, {
    timestamps: true
}
);

signInSchema.plugin(toJSON);


// exporting the model
export const  signInModel = model('signIn',signInSchema);