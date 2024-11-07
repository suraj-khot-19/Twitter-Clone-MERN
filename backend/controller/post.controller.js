import Post from "../model/post.model.js";
import User from "../model/user.model.js";
import { v2 as cloudinary } from 'cloudinary';

// !    create a post
export const createPost = async (req, res) => {
    try {
        //take user from middleware
        const commingUser = await User.findById(req.user._id);

        //if no user
        if (!commingUser) return res.status(400).json({ msg: 'no user found!' });

        //take from body
        let { title, img } = req.body;

        //if post is blank
        if (!title && !img) return res.status(400).json({ msg: 'post must contain any one of title or img' });

        //save image to cloud before save
        if (img) {
            const imgUrl = await cloudinary.uploader.upload(img); // get url
            img = imgUrl; // change img to url
        }

        //save the post
        const newPost = new Post({
            user: commingUser._id.toString(), // here need to save with string id
            title,
            img
        });

        //save
        await newPost.save();

        //send res
        res.status(200).json({ newPost });

    } catch (error) {
        console.log("error in create post,", error.message)
        res.status(500).json({ error: error.message });
    }
}