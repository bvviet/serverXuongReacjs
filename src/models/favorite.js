import mongoose from "mongoose";
const Schema = mongoose.Schema;

const FavoritesSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    favorites: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            addedAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});

const Favorite = mongoose.model("Favorite", FavoritesSchema);
export default Favorite;
