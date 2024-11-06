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
        },
        likes:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'User',
                required:true
            }
        ],
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
        ]
    },
    {
        timestamps: true
    }
);

const Post = mongoose.model('Post', postSchma);

export default Post;