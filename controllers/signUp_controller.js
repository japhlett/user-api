import { signUpModel } from "../models/signUp_model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

// create a new user
export const postSignUp = async (req, res) => {
    // validating the user input before storing
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Getting user details from request body
    const { username, password, email, fullname, contact } = req.body;
    try {
        // hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // creating and saving  new user
        const newUser = new signUpModel({
            username,
            password: hashedPassword,
            email,
            fullname,
            contact
        });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('There was an issue with your signup detail', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// get the details of a user

export const oneUser = async (req, res) => {
    try {
        const getUser = await signUpModel.findById(req.params.id)
        if (!getUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(getUser)
    } catch (error) {
        console.error(`Couldn't get the details of this user`, error);
        res.status(500).json({ error: 'Server error' });
    }
};


// get the details of all the users

export const allUsers = async (req, res) => {
    try {
        const getUsers = await signUpModel.find()
        res.status(200).json(getUsers)
    } catch (error) {
        console.error('Error getting all users details', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// updating a user's details

export const updateUser = async (req, res) => {
    try {
        const patchUser = await signUpModel.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true }
        );
        if (!patchUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(patchUser)
    } catch (error) {
        console.error(`User details couldn't be updated`, error);
        res.status(500).json({ error: 'Server error' });
    }
};

// deleting a user's details

export const deletedUser = async (req, res) => {
    try {
        const deleteUser = await signUpModel.findByIdAndDelete(req.params.id);
        if (!deleteUser) {
            return res.status(404).json({ error: `User with ID ${req.params.id} not found` });
        }
        res.status(200).json({ message: 'User deleted successfully', user: deleteUser })
    } catch (error) {
        console.error(`User with ID ${req.params.id} couldn't be deleted`, error);
        res.status(500).json({ error: 'Server error' });
    }
};

