import { comparePassword, hashPassword } from "../helpers/authHelper.js";

import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // validation
        if (!name) {
            return res.send(
            {
                success: false,
                message: 'Name is required'
            }
        );
        }

        if (!email) {
            return res.send(
            {
                success: false,
                message: 'Email is required'
            }
        );
        }

        if (!password) {
            return res.send(
            {
                success: false,
                message: 'Password is required'
            }
        );
        }

        // make sure its unique
        const user = await userModel.findOne({ email });
        if (user) {
            return res.send(
                {
                    success: false,
                    message: 'User already registered. Please LogIn'
                }
            );
        }

        // save user
        const hashedPassword = await hashPassword(password);
        const newUser = await new userModel({name, email, password: hashedPassword}).save();

        return res.status(200).send(
            {
                success: true,
                message: 'User registered successfully!',
                newUser
            }
        );
    } catch (err) {
        console.log('Error in registerController', { err });
        res.status(500).send(
            {
                success: false,
                message: 'Error in registration',
                error: err
            }
        );
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            return res.send(
            {
                success: false,
                message: 'Invalid email or password'
            }
        );
        }

        // check user
        const user = await userModel.findOne({email});

        if (!user) {
            return res.send(
                {
                    success: false,
                    message: 'User not found'
                }
            );
        }

        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.send(
                {
                    success: false,
                    message: 'Invalid password'
                }
            );
        }

        // create token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" } );

        return res.status(200).send(
            {
                success: true,
                message: 'Logged in successfully!',
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    id: user?._id,
                    address: user?.address,
                    phone: user?.phone
                },
                token
            }
        );
    } catch (err) {
        console.log('Error in loginController', { err });
        res.status(500).send(
            {
                success: false,
                message: 'Error in login',
                error: err
            }
        );
    }
};