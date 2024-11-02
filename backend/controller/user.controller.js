import User from "../model/user.model.js";

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
        if (id === req.user._id.toString()) //this user and main user(cookie[from miiddleware]{object})
            return res.status(400).json({ msg: "you cannot follow or unfollow self" });

        //follow (check with id)
        const isFollowing = currentUser.following.includes(id);

        //unfollow if id is includes
        if (isFollowing) {
            await User.findByIdAndUpdate(currentUser._id, { $pull: { following: id } });
            await User.findByIdAndUpdate(id, { $pull: { followers: currentUser._id } });

            //res
            res.status(200).json({ msg: `${userToModify.username} unfollowed sucessfully` })
        }
        //follow if id *not includes
        else {
            await User.findByIdAndUpdate(currentUser._id, { $push: { following: id } })
            await User.findByIdAndUpdate(id, { $push: { followers: currentUser._id } })

            res.status(200).json({ msg: `${userToModify.username} followed  sucessfully` })
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("error in follow/unfollow, ", error.message);
    }
}

// !    