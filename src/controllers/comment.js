import Comment from "../models/Comment.js";
import StatusCode from "http-status-codes";

class CommentController {
    // Get bình luận theo sản phẩm
    async getComment(req, res) {
        const { productId } = req.params;
        try {
            const comment = await Comment.find({ productId }).populate({
                path: "userId",
            });
            if (!comment) {
                return res.status(StatusCode.NOT_FOUND).json({
                    message: "Không tìm thấy bình luận.",
                });
            }
            res.status(StatusCode.OK).json({
                message: "Lấy bình luận thành công.",
                data: comment,
            });
        } catch (error) {
            res.status(StatusCode.BAD_REQUEST).json({
                messages: error.message,
            });
        }
    }

    // Tạo bình luận theo idUser, idProduct
    async addComment(req, res) {
        const { userId, productId, content, rating } = req.body;
        try {
            const comment = await Comment.create({ userId, productId, content, rating });
            res.status(StatusCode.OK).json({
                messages: "Thêm bình luận thành công.",
                data: comment,
            });
        } catch (error) {
            res.status(StatusCode.BAD_REQUEST).json({
                messages: error.message,
            });
        }
    }

    // Cập nhập bình luận theo idUser, idProduct
    async updateComment(req, res) {
        const { commentId } = req.params;
        const { content, rating } = req.body;
        try {
            const comment = await Comment.findByIdAndUpdate(commentId, { content, rating });
            if (!comment) {
                res.status(StatusCode.NOT_FOUND).json({
                    messages: "Không tìm thấy bình luận cần xóa.",
                });
            }
            res.status(StatusCode.OK).json({
                messages: "Cập nhật bình luận thành công.",
            });
        } catch (error) {
            res.status(StatusCode.BAD_REQUEST).json({
                messages: error.message,
            });
        }
    }

    // Xóa bình luận
    async deleteComment(req, res) {
        const { commentId } = req.params;
        try {
            const comment = await Comment.findByIdAndDelete(commentId);
            if (!comment) {
                return res.status(StatusCode.NOT_FOUND).json({
                    message: "Không tìm thấy bình luận cần xóa.",
                });
            }
            res.status(StatusCode.OK).json({
                message: "Xóa thành công.",
            });
        } catch (error) {
            res.status(StatusCode).json({
                messages: error.message,
            });
        }
    }
}

export default new CommentController();
