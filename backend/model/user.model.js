import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minLength: 6
        },
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId, ///basically a unique 16char id
                ref: "User",
                default: []
            }
        ],
        following: [
            {
                type: mongoose.Schema.Types.ObjectId, ///basically a unique 16char id
                ref: "User",
                default: []
            }
        ],
        bio: {
            type: String,
            default: '',
        },
        profileImg: {
            type: String,
            default: '',
        },
        coverImg: {
            type: String,
            default: '',
        },
        link: {
            type: String,
            default: '',
        },
        country: {
            type: String,
            default: 'IN',
        },
        //liked post by this user
        liked: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post',
                default: []
            }
        ]
    },
    {
        //allows created/updated at feilds automatically
        timestamps: true
    }
);

//create a schemas model
const User = mongoose.model("User", userSchema);
export default User;