import { Router } from "express";
import authRouter from "./auth.js";
import categoriesRouter from "./categories.js";
import productsRouter from "./products.js";
import commentRouter from "./comment.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("Home");
});

router.use("/auth", authRouter);
router.use("/categories", categoriesRouter);
router.use("/products", productsRouter);
router.use("/comment", commentRouter);

export default router;
