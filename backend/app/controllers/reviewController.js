import reviewService from "../services/reviewService.js";

class ReviewController {
  async addReview(req, res) {
    try {
      const review = await reviewService.addReview(req.body);
      res.status(201).json({
        success: true,
        message: "Review added successfully",
        data: review,
      });
    } catch (error) {
      console.error("Error in reviewController controller:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while adding the review",
        error: error.message,
      });
    }
  }
}

export default new ReviewController();
