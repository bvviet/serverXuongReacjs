import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError.js";
import Cart from "../models/CartModel.js";

class CartController {
    // GET /cart
    async getAll(req, res, next) {
        try {
            const carts = await Cart.find()
                .populate("userId", "_id username")
                .populate({
                    path: "cartItems.product",
                    select: "_id name price category image",
                    populate: { path: "category", select: "name" },
                });
            res.status(StatusCodes.OK).json(carts);
        } catch (error) {
            next(error);
        }
    }

    async getDetailUserId(req, res, next) {
        try {
            const userId = req.params.userId;

            // Truy xuất tất cả các đơn hàng của người dùng
            const orders = await Cart.find({ userId: userId })
                .populate("userId", "_id username")
                .populate({
                    path: "cartItems.product",
                    select: "_id name price category image",
                    populate: { path: "category", select: "name" },
                });

            // Gộp các mục trong cartItems lại thành một danh sách duy nhất
            const mergedCartItems = orders.reduce((acc, order) => {
                order.cartItems.forEach((item) => acc.push(item));
                return acc;
            }, []);

            res.status(StatusCodes.OK).json({
                messages: "Lấy thành công",
                cartItems: mergedCartItems,
            });
        } catch (error) {
            console.error("Error fetching order history:", error);
            res.status(500).send("Server error");
        }
    }

    // GET /cart/:id
    async getDetail(req, res, next) {
        try {
            const cart = await Cart.findById(req.params.id)
                .populate("userId", "_id username")
                .populate({
                    path: "cartItems.product",
                    select: "_id name price category image",
                    populate: { path: "category", select: "name" },
                });

            if (!cart) throw new ApiError(StatusCodes.NOT_FOUND, "Cart Not Found");
            res.status(StatusCodes.OK).json(cart);
        } catch (error) {
            next(error);
        }
    }

    // POST /cart
    async create(req, res, next) {
        try {
            const newCart = await Cart.create(req.body);
            res.status(StatusCodes.CREATED).json({
                message: "Create Cart Successful",
                data: newCart,
            });
        } catch (error) {
            console.error("Error creating cart:", error);
            next(error);
        }
    }

    // PUT /cart/:id
    async update(req, res, next) {
        try {
            const updateCart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });
            if (!updateCart) throw new ApiError(StatusCodes.NOT_FOUND, "Cart Not Found");
            res.status(StatusCodes.OK).json({
                message: "Update Cart Successful",
                data: updateCart,
            });
        } catch (error) {
            next(error);
        }
    }

    // DELETE /cart/:id
    async delete(req, res, next) {
        try {
            const cart = await Cart.findByIdAndDelete(req.params.id);
            if (!cart) throw new ApiError(StatusCodes.NOT_FOUND, "Cart Not Found");
            res.status(StatusCodes.OK).json({
                message: "Delete Cart Done",
            });
        } catch (error) {
            next(error);
        }
    }
}

export default CartController;
