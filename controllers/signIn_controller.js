import { signInModel } from "../models/signIn_model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

// create a new user
export const postSignIn = async (req, res) => {

    // Validating user Input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //  getting the username and password from the req.body
    const { username, password } = req.body;
    try {
        // checking if the username entered exists
        const user = await signInModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        // checking if the password entered matches with what is stored
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // getting a response if successful
        res.status(200).json({ message: 'Sign-in successful', user });

    } catch (error) {
        console.log('There was an issue with your sigup detail', error);
        res.status(500).json({ error: 'Server error' });
    }
};


// get the details of a user

export const oneUser = async (req, res) => {
    try {
        const getUser = await signInModel.findById(req.params.id)
        if (!getUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(getUser)
    } catch (error) {
        console.log(`Couldn't get the details of this user`, error);
        res.status(500).json({ error: 'Server error' });
    }
};


// get the details of all the users

export const allUsers = async (req, res) => {
    try {
        const getUsers = await signInModel.find()
        res.status(200).json(getUsers)
    } catch (error) {
        console.log('Error getting all users details');
        res.status(500).json({ error: 'Server error' });
    }
};


// updating a user's details

export const updateUser = async (req, res) => {
    try {
        const patchUser = await signInModel.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true }
        );
        if (!patchUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(patchUser)
    } catch (error) {
        console.log(`User details couldn't be updated`, error);
        res.status(500).json({ error: 'Server error' });
    }
};


// deleting a user's details

export const deletedUser = async (req, res) => {
    try {
        const deleteUser = await signInModel.findByIdAndDelete(req.params.id)
        if (!deleteUser) {
            return res.status(404).json({ error: `User with ID ${req.params.id} not found` });
        }
    } catch (error) {
        console.log(`User with ID ${req.params.id} couldn't be deleted`, error);
        res.status(500).json({ error: 'Server error' });
    }
};


