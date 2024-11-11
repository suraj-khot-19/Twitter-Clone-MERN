import mongoose from "mongoose";

const postSchma = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        title:{
            type:String
        },
        img:{
            type:String,
            default:''
        },
        likes:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'User',
                required:true
            }
        ], //likes.length will be likes count
        comments:[
            {
                title:{
                    type:String,
                    required:true
                },
                user:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'User',
                    required:true
                }
            }
        ] //comments.length will be comments count
    },
    {
        timestamps: true
    }
);

const Post = mongoose.model('Post', postSchma);

export default Post;