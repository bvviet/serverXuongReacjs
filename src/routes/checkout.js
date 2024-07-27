import { Router } from "express";
import CheckOutController from "../controllers/CheckOutController";


const CheckRouter = Router();

const CheckController = new CheckOutController();

CheckRouter.get("/", CheckController.getAllCheckOut);
CheckRouter.get("/:id", CheckController.getCheckOutDetail);
CheckRouter.post("/", CheckController.createCheckout);
CheckRouter.put("/:id", CheckController.updateCheckout);
CheckRouter.delete("/:id", CheckController.deleteCheckout);

export default CheckRouter;
