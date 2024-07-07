import express from "express";
import { signInRouter } from "./routes/signIn_route.js";
import { signUpRouter } from "./routes/signUp_route.js";
import { dbConnection } from "./config/db.js";
import expressOasGenerator from  "express-oas-generator";
import mongoose from "mongoose";

// connect to database
dbConnection();


// creating the express app
const app= express();
expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags : ['signin','signUp'],
    mongooseModels:mongoose.modelNames(),
});


// applying middlewares
app.use(express.json());


// using routes
app.use(signInRouter);
app.use(signUpRouter);
expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/'))

// listening for incoming requests
const port = process.env.PORT || 4555;
app.listen(port, () => {
    console.log(`App listening on port 4555`);
});