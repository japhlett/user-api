import express from "express";


// creating the express app
const user = express();



// applying middlewares
user.use(express.json());




// listening for incoming requests
const port = process.env.PORT || 4555;
user.listen(port, () => {
    console.log(`App listening on port 4555`);
});