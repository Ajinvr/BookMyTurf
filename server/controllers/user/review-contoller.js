import { review } from '../../db/models/reviewsModel.js';

export const addReview = async (req, res) => {
  const { name, rating, description, turfId } = req.body;
  const userid = req.user.id;

  if (!name || !rating || !turfId) {
    return res.status(400).json({ msg: "Name, rating, and turf ID are required", ts: "error" });
  }

  try {
    const newReview = await review.create({ name, userid, rating, description });

    return res.status(201).json({ msg: "Review added successfully", ts: "success" });
  } catch (error) {
    console.error("Error adding review:", error);
    return res.status(500).json({ msg: "Server error", ts: "error" });
  }
};



export const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  const userid = req.user.id;

  if (!reviewId) {
    return res.status(400).json({ msg: "Review ID is required", ts: "error" });
  }

  try {
    const reviewToDelete = await review.findById(reviewId);

    if (!reviewToDelete) {
      return res.status(404).json({ msg: "Review not found", ts: "error" });
    }

    await review.findByIdAndDelete(reviewId);

    return res.status(200).json({ msg: "Review successfully deleted", ts: "success" });
  } catch (error) {
    console.error("Error deleting review:", error);
    return res.status(500).json({ msg: "Server error", ts: "error" });
  }
};
