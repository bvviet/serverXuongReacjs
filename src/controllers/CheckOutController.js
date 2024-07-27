import { StatusCodes } from "http-status-codes";
import CheckOut from "../models/CheckoutModel.js";
import ApiError from "../utils/ApiError.js";

class CheckOutController {
    // GET /checkout
    async getAllCheckOut(req, res, next) {
        try {
            const check = await CheckOut.find();
            res.status(StatusCodes.OK).json(check);
        } catch (error) {
            next(error);
        }
    }
    // GET /checkout/:id
    async getCheckOutDetail(req, res, next) {
        try {
            const check = await CheckOut.findById(req.params.id);

            if (!check) throw new ApiError(404, "CheckOut Not Found");
            res.status(StatusCodes.OK).json(check);
        } catch (error) {
            next(error);
        }
    }
    // POST /checkout
    async createCheckout(req, res, next) {
        try {
            const newCheck = await CheckOut.create(req.body);
            res.status(StatusCodes.CREATED).json({
                message: "Create CheckOut Successfull",
                data: newCheck,
            });
        } catch (error) {
            next(error);
        }
    }
    // PUT /checkout/:id
    async updateCheckout(req, res, next) {
        try {
            const updateCheck = await CheckOut.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updateCheck) throw new ApiError(404, "Checkout Not Found");

            res.status(StatusCodes.OK).json({
                message: "Update Checkout Successfull",
                data: updateCheck,
            });
        } catch (error) {
            next(error);
        }
    }
    // DELETE /checkout/:id
    async deleteCheckout(req, res, next) {
        try {
            const check = await CheckOut.findByIdAndDelete(req.params.id);
            if (!check) throw new ApiError(404, "CheckOut Not Found");
            res.status(StatusCodes.OK).json({
                message: "Delete CheckOut Done",
            });
        } catch (error) {
            next(error);
        }
    }
}

export default CheckOutController;
