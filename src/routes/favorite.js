import { Router } from "express";
import FavoriteController from "../controllers/favorite.js";
const favoriteRouter = Router();

favoriteRouter.get("/:userId", FavoriteController.getFavorites);
favoriteRouter.post("/", FavoriteController.createFavorite);
favoriteRouter.delete("/:userId/:productId", FavoriteController.deleteFavorite);

export default favoriteRouter;
