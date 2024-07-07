import express from "express";
import { signInRouter } from "./routes/signIn_route.js";
import { signUpRouter } from "./routes/signUp_route.js";
import { dbConnection } from "./config/db.js";
import expressOasGenerator from "express-oas-generator";
import mongoose from "mongoose";

// Connect to the database
dbConnection();

// Create the express app
const app = express();

// Initialize OpenAPI (Swagger) docs
expressOasGenerator.init(app, {
    alwaysServeDocs: true,
    tags: ['signIn', 'signUp'],
    mongooseModels: mongoose.modelNames(),
});

// Middleware for parsing JSON bodies
app.use(express.json());

// Serve static files
app.use(express.static('public'));

// Use routes
app.use( signInRouter);
app.use(signUpRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// Redirect to API docs if no route matches
app.use((req, res) => res.redirect('/api-docs/'));

// Listen for incoming requests
const port = process.env.PORT || 4555;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
