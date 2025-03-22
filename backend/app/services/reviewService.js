import db from "../models/index.js";

class ReviewService {
  async addReview(reviewData) {
    try {
      const review = await db.models.Review.create(reviewData);
      return review;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export default new ReviewService();
