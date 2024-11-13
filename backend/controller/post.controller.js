import Notification from "../model/notification.model.js";
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
        if (currentUserId !== post.user.toString()) return res.status(400).json({ msg: "No you dont have any authority to delete this post!" });

        //delete img from cloudinary
        if (post.img) {
            const imgId = post.img.split("/").pop().split(".")[0];
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

// !    comment on post
export const commentOnPost = async (req, res) => {
    try {
        //take from body
        const { title } = req.body

        //check comment
        if (!title) return res.status(400).json({ msg: "to post a comment, comment is required!" })

        //take current user id
        const currentUserId = req.user._id; // take from middleware

        //take post id from params
        const postId = req.params.id;

        //check post exists or not
        const post = await Post.findById(postId);
        if (!post) return res.status(400).json({ msg: "no post found!" })

        //new comment
        const newComment = { user: currentUserId, title }

        //push new comment in post.comments array
        post.comments.push(newComment);

        //and then save post
        await post.save()

        //send res
        res.status(200).json({ msg: "commented successfully!" })

    } catch (error) {
        console.log("error in comment,", error.message)
        res.status(500).json({ error: error.message })
    }
}

// !    like or unlike a post
export const likeOrUnlikePost = async (req, res) => {
    try {
        //get current user id
        const currentUserId = req.user._id;    //from middleware

        //get post id from prams
        const postId = req.params.id;

        //find a post
        let post = await Post.findById(postId);

        //if no post
        if (!post) return res.status(400).json({ msg: "No post found!" });

        //if already liked then unlike
        if (post.likes.includes(currentUserId)) {
            //pull a uid from likes array
            await Post.updateOne({ _id: postId }, { $pull: { likes: currentUserId } })

            //also delete a user model's liked posts
            await User.updateOne({ _id: currentUserId }, { $pull: { liked: postId } }); //delete current users liked post with post id

            //delete notification if there
            await Notification.deleteOne({
                from: currentUserId,
                to: post.user._id,
                type: 'like'
            });

            // new likes for ui expreience
            const likesArray = post.likes.filter((id) => id.toString() !== currentUserId.toString()); //!unlike remove id
            //send res
			res.status(200).json(likesArray);
        }
        //or else like
        else {
            //push uid 
            post.likes.push(currentUserId);

            //also add to current users liked posts
            await User.updateOne({ _id: currentUserId }, { $push: { liked: postId } }); //add current users liked post with post id

            //and save
            await post.save();

            //sending notification to user which have the post
            const notification = new Notification({
                from: currentUserId,
                to: post.user._id,
                type: 'like',
            });
            await notification.save();

            //send res
            const likesArray = post.likes; //! return liked array
			res.status(200).json(likesArray);
        }
    } catch (error) {
        console.log("error in like or unlike,", error.message)
        res.status(500).json({ error: error.message })
    }
}

// !    get all posts
export const getAllPosts = async (req, res) => {
    try {
        //sort by created at and 
        //also send userDetails from User model where id equals to the id in post using populate method

        // const posts = await Post.find({}).sort({ createdAt: -1 }).populate('user').select("-password"); will not works
        const posts = await Post.find({}).sort({ createdAt: -1 }).populate({
            path: 'user',
            select: '-password'
        }).populate({
            path: 'comments.user',
            select: "-password"
        });

        //if an empty
        if (posts.length == 0) return res.status(200).json([])

        //if there
        res.status(200).json({ posts })
    } catch (error) {
        console.log("error in get all posts,", error.message)
        res.status(500).json({ error: error.message })
    }
}

// !    get liked post of any user
export const likedByMe = async (req, res) => {
    try {
        //get user id **not current user**
        const id = req.params.id;

        //find
        const user = await User.findById(id);

        //if not found
        if (!user) {
            return res.status(400).json({ msg: "No user founnd!" });
        }

        //if found return its post liked by him/her
        const likedPosts = await Post.find({ _id: { $in: user.liked } })
            .populate({
                path: 'user',
                select: '-password'
            }).populate({
                path: 'comments.user',
                select: '-password'
            });
        res.status(200).json({ posts:likedPosts });
    } catch (error) {
        console.log("error in liked by me,", error.message)
        res.status(500).json({ error: error.message });
    }
}

// !    getting posts of users followed by current users haaaa
export const getPostOfMyFollowing = async (req, res) => {
    try {
        //get current user from middleware
        const uid = req.user._id;

        //find
        const user = await User.findById(uid);

        //if not
        if (!user) return res.status(400).json({ msg: "no user found!" });

        //only following user array
        const following = user.following;

        //sort all post with following users
        const posts = await Post.find({ user: { $in: following } })
            .populate({
                path: 'user',
                select: "-password"
            }).populate({
                path: 'comments.user',
                select: '-password'
            });

        res.status(200).json({ posts })
    } catch (error) {
        console.log("error in getPostOfMyFollowing,", error.message);
        res.status(500).json({ error: error.message })
    }
}

// !    post of user
export const usersPosts = async (req, res) => {
    try {
        //take from params
        const username = req.params.username;

        //find user
        const user = await User.findOne({ username })

        //if not
        if (!user) return res.status(400).json({ msg: "No user found!" })

        //if user then sort posts
        let posts = await Post.find({ user: user._id }).sort({createdAt:-1}).populate({
            path:'user',
            select:'-password'
        }).populate({
            path:'comments.user',
            select:'-password'
        })

        //send to res
        res.status(200).json({ posts })
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("error in user posts ", error.message)
    }
}