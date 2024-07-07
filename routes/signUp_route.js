import { Router } from "express";
import { postSignUp, oneUser, allUsers, deletedUser, updateUser } from "../controllers/signUp_controller.js";



// create a user router
export const signUpRouter = Router();

// define all routes
signUpRouter.post('/signUp', postSignUp);
signUpRouter.get('/signUp', allUsers);
signUpRouter.get('/signUp/:id', oneUser);
signUpRouter.delete('/signUp/:id', deletedUser);
signUpRouter.patch('/signUp/:id', updateUser);