import jwt from "jsonwebtoken";
import Notification from "../model/notification.model.js";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from 'cloudinary';

// !    get profile localhost:5000/api/v2/user/profile/username
export const getProfile = async (req, res) => {
    try {
        //? if user is not looged in then middleware just say that 

        //take from parameter
        const { username } = req.params;

        //find user
        const user = await User.findOne({ username }).select('-password');

        //if not user
        if (!user) {
            return res.status(400).json({ msg: "No user Found" })
        }

        //send user back to response
        res.json({ user })
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("error in get profile, ", error.message)
    }
}

// !    follow or unfollow
export const followOrUnfollow = async (req, res) => {
    try {
        //? if user is not looged in then middleware just say that 

        //take id from request parameter
        const { id } = req.params;

        //check user
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id); //this will gave us middleware

        //if no user fouund
        if (!userToModify || !currentUser)
            return res.status(400).json({ msg: "no user found" });

        //following or unfollowing self
        if (userToModify._id === req.user._id.toString()) //this user and main user(cookie[from miiddleware]{object})
            return res.status(400).json({ msg: "you cannot follow or unfollow self" });

        //follow (check with id)
        const isFollowing = currentUser.following.includes(userToModify._id);

        //unfollow if id is includes
        if (isFollowing) {
            await User.findByIdAndUpdate(currentUser._id, { $pull: { following: userToModify._id } });
            await User.findByIdAndUpdate(userToModify._id, { $pull: { followers: currentUser._id } });

            //also sending a notification
            const notification = new Notification({
                from: currentUser._id,
                to: userToModify._id,
                type: 'follow'
            })

            //also save in model
            await notification.save();

            //res
            res.status(200).json({ msg: `${userToModify.username} unfollowed sucessfully` });

        }
        //follow if id *not includes
        else {
            await User.findByIdAndUpdate(currentUser._id, { $push: { following: userToModify._id } })
            await User.findByIdAndUpdate(userToModify._id, { $push: { followers: currentUser._id } })

            //also sending a notification
            const notification = new Notification({
                from: currentUser._id,
                to: userToModify._id,
                type: 'follow'
            })

            //also save in model
            await notification.save();

            res.status(200).json({ msg: `${userToModify.username} followed  sucessfully` })
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("error in follow/unfollow, ", error.message);
    }
}

// !   get suggestions
export const getSuggestedUser = async (req, res) => {
    try {
        //get current user
        const currentUser = await User.findById(req.user._id); //user from middleware

        //followed user
        const alreadyFollowed = await User.findById(req.user._id).select("following") //selecting following array

        //getting random 10 users
        const users = User.aggregate([{
            $match: {
                _id: { $ne: currentUser._id } //select id's but it is not equal to cureent user id
            }
        },
        {
            $sample: { size: 10 }
        }
        ]);

        //filtering users
        const filteredUsers = (await users).filter((user) => !alreadyFollowed.following.includes(user._id)) //those who not followed 

        //taking only 5 of them
        const suggestedUser = filteredUsers.slice(0, 5)

        //! do not send a password
        suggestedUser.forEach((u) => u.password = null);

        //send
        res.status(200).json({ suggestedUser });
    } catch (error) {
        console.log("error in suggetion user, ", error.message)
        res.status(500).json({ error: error.message });
    }
}

// !    update profile
export const updateProfile = async (req, res) => {

    try {

        //take user id from middleware
        const uid = req.user._id;

        //take from request
        const { username, email, bio, link, country, fullname, updatepassword, currentpassword } = req.body;
        let { profileImg, coverImg } = req.body;

        //find user
        let user = await User.findById(uid);

        //if no user found
        if (!user) {
            return res.status(400).json({ msg: "user not found!" })
        }

        //now check if pass updatepass is provided
        if ((!updatepassword && currentpassword) || (!currentpassword && updatepassword)) {
            return res.status(400).json({ msg: "both current password and update password must be provided!" })
        }

        //if botth provided
        if (updatepassword && currentpassword) {
            //compare passwords
            const verify = await bcrypt.compare(currentpassword, user.password); //function compare(string, hash)

            //if no match
            if (!verify) return res.status(400).json({ msg: "passsword not match" });

            //if both are same
            if (currentpassword === updatepassword) return res.status(400).json({ msg: "password must not same as current password!" });

            //check new pass length
            if (updatepassword.length < 6) return res.status(400).json({ msg: "passsword must be at least 6 char" });

            //encrypt before store
            const salt = await bcrypt.genSalt(10);

            //now saay update password in user password with has
            user.password = await bcrypt.hash(updatepassword, salt);

        }

        //if profile image
        if (profileImg) {
            //if already there
            if (user.profileImg) {
                //split with / and remove that all in remainng like id.png so split like "." and then select [0] th means id and destroy it
                await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0]);
            }

            //upload on cloud
            const upoaded = await cloudinary.uploader(profileImg);
            profileImg = upoaded.secure_url;
        }

        //if cover image
        if (coverImg) {
            //if already there
            if (user.coverImg) {
                //split with / and remove that all in remainng like id.png so split like "." and then select [0] th means id and destroy it
                await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0]);
            }

            //upload on cloud
            const upoaded = await cloudinary.uploader(coverImg);
            coverImg = upoaded.secure_url;
        }

        //now update all feilds
        user.fullname = fullname || user.fullname;
        user.bio = bio || user.bio;
        user.username = username || user.username;
        user.email = email || user.email;
        user.profileImg = profileImg || user.profileImg;
        user.coverImg = coverImg || user.coverImg;
        user.link = link || user.link;
        user.country = country || user.country;

        // and then save user
        user = await user.save();

        //do not send pass in res but after save
        user.password = null;

        res.status(200).json({ msg: "profile updated successfully" })
    } catch (error) {
        console.log("error in profile update, ", error.message)
        res.status(500).json({ error: error.message })
    }
}