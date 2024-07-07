import mongoose from "mongoose";


const mongo_url = process.env.MONGO_URL;

// connectionlink
export const dbConnection =() =>{
    mongoose.connect(mongo_url).then(() => {
    console.log('Database connected')
})
};
