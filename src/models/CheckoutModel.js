import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CheckOutSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            require: true
        },
        email: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        stage: {
            type: String,
            required: true,
        },

        address: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const CheckOut = mongoose.model("checkout", CheckOutSchema);

export default CheckOut;
