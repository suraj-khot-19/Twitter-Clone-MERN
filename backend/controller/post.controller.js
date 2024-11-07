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

// !    delete an existing post
export const deletePost = async (req, res) => {
    try {
        //take current user id from middleware
        const currentUserId = req.user._id.toString();

        //post
        const post = await Post.findById(req.params.id);

        //if not found any of post
        if (!post) return res.status(400).json({ msg: "No post found!" });

        //if another user try to delete a post
        if(currentUserId!==post.user.toString()) return res.status(400).json({ msg: "No you dont have any authority to delete this post!" });

        //delete img from cloudinary
        if(post.img){
            const imgId=post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imgId);
        }

        //if post then delete
        await Post.findByIdAndDelete(req.params.id);

        //send res
        res.status(200).json({ msg: "post deleted successfully!" });

    } catch (error) {
        console.log("error in delete post,", error.message)
        res.status(500).json({ error: error.message });
    }
}