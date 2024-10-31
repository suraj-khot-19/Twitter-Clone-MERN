import cookieParser from 'cookie-parser';
import generateToken from '../config/generateToken.js';
import User from '../model/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// !    sign up
export const signUp = async (req, res) => {
    try {
        //take from body
        const { username, fullname, email, password } = req.body;

        //check valid email
        const emailRgx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!emailRgx.test(email)) {
            return res.status(400).json({ msg: "Invalid email id!" });
        }

        //check user exisit
        const exist = await User.findOne({ username });
        if (exist) {
            return res.status(400).json({ msg: 'Username is already exists!' })
        }

        //check email exists
        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(400).json({ msg: 'email already exists!' })
        }

        //validate  password
        if (password.length < 6) {
            return res.status(400).json({ msg: 'password must be at least 6 characters!' })
        }

        //hash password before save
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //so user add to db
        const newUser = new User({
            username,
            email,
            password: hashPassword,
            fullname
        });

        //then genrate a token 
        if (newUser) {
            //save
            await newUser.save();

            //genrate token
            generateToken(newUser._id, res);

            //send user back to frontend
            res.status(201).json({ user: newUser });
        }
        else {
            return res.status(400).json({ msg: "Invalid user" })
        }
    } catch (error) {
        console.log('sign up error, ', error.message);
        res.status(500).json({ error: "internal server error" })
    }
}


// !    login
export const login = async (req, res) => {
    try {
        //take from req
        const { username, password } = req.body;

        //search for user in db
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: "User Not exists!" })
        }

        //if user then check password
        const verifyPassword = await bcrypt.compare(password, user?.password || '');//check not nullable
        if (!verifyPassword) {
            return res.status(400).json({ msg: "username or password is incorrect!" });
        }

        //if ok genrate token
        generateToken(user._id, res);

        res.status(200).json({ user });
    } catch (error) {
        console.log("error in login, ", error.message)
        res.status(500).json({ error: error.message })
    }
}


// !    logout
export const logout = async (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 0 });
        res.status(200).json({ msg: "Logged out sucessfuly!" })
    } catch (error) {
        console.log('error in logout, ', error.message)
        res.status(500).json({ error: error.message })
    }
}