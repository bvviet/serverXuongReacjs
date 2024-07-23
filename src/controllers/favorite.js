import Favorite from "../models/favorite.js";
import StatusCodes from "http-status-codes";

class FavoriteController {
    // Lấy sản phẩm yêu thích
    async getFavorites(req, res) {
        const { userId } = req.params;
        try {
            const favorite = await Favorite.findOne({ userId }).populate("favorites.productId");
            if (!favorite || favorite.favorites.length === 0) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    messages: "Không tìm thấy sản phẩm yêu thích nào.",
                });
            }
            res.status(StatusCodes.OK).json({
                messages: "Lấy danh sách yêu thích thành công.",
                data: favorite.favorites,
            });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                messages: error.messages,
            });
        }
    }

    // Thêm sản phẩm yêu thích
    async createFavorite(req, res) {
        const { userId, productId } = req.body;
        try {
            let favorite = await Favorite.findOne({ userId });

            // Nếu không tìm thấy, tạo mới
            if (!favorite) {
                favorite = new Favorite({ userId, favorites: [{ productId }] });
            } else {
                // Kiểm tra xem sản phẩm đã có trong danh sách yêu thích chưa
                const productExists = favorite.favorites.some((fav) => fav.productId.toString() === productId);
                if (productExists) {
                    return res
                        .status(StatusCodes.CONFLICT)
                        .json({ message: "sản phẩm đã có trong danh sách yêu thích." });
                }

                // Thêm sản phẩm vào danh sách yêu thích
                favorite.favorites.push({ productId });
            }

            await favorite.save();
            res.status(StatusCodes.OK).json({
                messages: "Thêm vào danh sách yêu thích thành công.",
                data: favorite,
            });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                messages: error.messages,
            });
        }
    }

    // Xóa sản phẩm yêu thích
    async deleteFavorite(req, res) {
        const { userId, productId } = req.params;
        try {
            // Tìm tài liệu yêu thích của người dùng
            const favorite = await Favorite.findOne({ userId });

            if (!favorite) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    messages: "Danh sách yêu thích của người dùng không tồn tại.",
                });
            }

            // Tìm chỉ số của sản phẩm trong mảng favorites
            const productIndex = favorite.favorites.findIndex((fav) => fav.productId.toString() === productId);

            if (productIndex === -1) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    messages: "Sản phẩm không có trong danh sách yêu thích.",
                });
            }

            // Xóa sản phẩm khỏi mảng favorites
            favorite.favorites.splice(productIndex, 1);

            // Lưu thay đổi vào cơ sở dữ liệu
            await favorite.save();

            res.status(StatusCodes.OK).json({
                messages: "Xóa khỏi danh sách yêu thích thành công.",
            });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                messages: error.message,
            });
        }
    }
}

export default new FavoriteController();
