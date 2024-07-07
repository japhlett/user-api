import { Router } from "express";
import { postSignIn, oneUser, allUsers, deletedUser, updateUser } from "../controllers/signIn_controller.js";



// create a user router
export const signInRouter = Router();

// define all routes
signInRouter.post('/signIn', postSignIn);
signInRouter.get('/signIn', allUsers);
signInRouter.get('/signIn/:id', oneUser);
signInRouter.delete('/signIn/:id', deletedUser);
signInRouter.patch('/signIn/:id', updateUser);