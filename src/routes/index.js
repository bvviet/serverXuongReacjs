import { Router } from "express";
import authRouter from "./auth.js";
import categoriesRouter from "./categories.js";
import productsRouter from "./products.js";
import commentRouter from "./comment.js";
import favoriteRouter from "./favorite.js";
import CheckRouter from "./checkout.js";
import CartRouter from "./cart.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("Home");
});

router.use("/auth", authRouter);
router.use("/categories", categoriesRouter);
router.use("/products", productsRouter);
router.use("/comment", commentRouter);
router.use("/favorite", favoriteRouter);
router.use("/checkout", CheckRouter);
router.use("/cart", CartRouter);

export default router;
