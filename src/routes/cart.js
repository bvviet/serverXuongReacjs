import { Router } from "express";
import CartController from "../controllers/CartController";

const CartRouter = Router();

const OrderController = new CartController();

CartRouter.get("/", OrderController.getAll);
CartRouter.get("/:userId", OrderController.getDetailUserId);
CartRouter.get("/:id", OrderController.getDetail);
CartRouter.post("/", OrderController.create);
CartRouter.put("/:id", OrderController.update);
CartRouter.delete("/:id", OrderController.delete);

export default CartRouter;
