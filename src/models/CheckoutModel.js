import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CheckOutSchema = new Schema(
    {
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

);

const CheckOut = mongoose.model("checkout", CheckOutSchema);

export default CheckOut;
