import { StatusCodes } from "http-status-codes";
import Product from "../models/ProductModel.js";
import ApiError from "../utils/ApiError.js";

class ProductsController {
    // Tìm kiếm sản phẩm
    async searchProduct(req, res) {
        try {
            const { name } = req.query;
            const filter = {};
            if (name) {
                filter.name = new RegExp(name, "i");
            } else {
                return res.status(200).json({
                    message: "Không có kết quả",
                    data: [],
                });
            }
            const products = await Product.find(filter).populate("category");

            res.status(StatusCodes.OK).json({
                message: "Tìm kiếm thành công",
                data: products,
            });
        } catch (error) {
            next(error);
        }
    }

    // Lọc sản phẩm theo danh mục
    async filterProductCategory(req, res, next) {
        try {
            const { categoryName } = req.query;
            if (categoryName) {
                const products = await Product.find()
                    .populate({
                        path: "category",
                        match: { name: categoryName },
                    })
                    .exec();
                const filteredProducts = products.filter((product) => product.category !== null);
                res.status(StatusCodes.OK).json({
                    message: "Lọc sản phẩm theo danh mục thành công",
                    data: filteredProducts,
                });
            } else {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Danh mục không được cung cấp",
                });
            }
        } catch (error) {
            next(error);
        }
    }

    // GET /products
    async getAllProducts(req, res, next) {
        try {
            const products = await Product.find().populate("category");
            res.status(StatusCodes.OK).json(products);
        } catch (error) {
            next(error);
        }
    }
    // GET /products/:id
    async getProductDetail(req, res, next) {
        try {
            const product = await Product.findById(req.params.id).populate("category");

            if (!product) throw new ApiError(404, "Product Not Found");
            res.status(StatusCodes.OK).json(product);
        } catch (error) {
            next(error);
        }
    }
    // POST /products
    async createProduct(req, res, next) {
        try {
            const newProduct = await Product.create(req.body);
            res.status(StatusCodes.CREATED).json({
                message: "Create Product Successfull",
                data: newProduct,
            });
        } catch (error) {
            next(error);
        }
    }
    // PUT /products/:id
    async updateProduct(req, res, next) {
        try {
            const updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updateProduct) throw new ApiError(404, "Product Not Found");

            res.status(StatusCodes.OK).json({
                message: "Update Product Successfull",
                data: updateProduct,
            });
        } catch (error) {
            next(error);
        }
    }
    // DELETE /products/:id
    async deleteProduct(req, res, next) {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            if (!product) throw new ApiError(404, "Product Not Found");
            res.status(StatusCodes.OK).json({
                message: "Delete Product Done",
            });
        } catch (error) {
            next(error);
        }
    }
}

export default ProductsController;
