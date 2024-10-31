import User from "../model/user.model.js";

export const getProfile = async (req, res) => {
    try {
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