import generateToken from '../config/generateToken.js';
import User from '../model/user.model.js';
import bcrypt from 'bcryptjs';

// !    sign up
export const signUp = async (req, res) => {
    try {
        //take from body
        const { fullName, username, email, password } = req.body;

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

        //hash password before save
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //so user add to db
        const newUser = new User({
            username,
            email,
            password: hashPassword,
            fullName
        });

        //then genrate a token 
        if (newUser) {
            generateToken(newUser._id, res);
            //send user back
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                fullName: newUser.fullname,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                coverImg: newUser.coverImg,
                profileImg: newUser.profileImg,
            });
        }
        else {
            res.status(400).json({ msg: "Invalid user" })
        }
    } catch (error) {
        console.log('sign up error, ', error.message);
        res.status(500).json({ error: "internal server error" })
    }
}


// !    login
export const login = async (req, res) => {
    res.json({
        data: 'listning to login'
    })
}


// !    logout
export const logout = async (req, res) => {
    res.json({
        data: 'listning to logout'
    })
}