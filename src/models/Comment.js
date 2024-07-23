import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
