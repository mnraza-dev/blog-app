import mongoose, { Schema } from "mongoose";

const postschema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
    },
    tags: {
        type: [String],

    },
    isPublished: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    });

const Post = mongoose.model('Post', postschema);
export default Post;