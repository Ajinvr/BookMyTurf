import { review } from '../../db/models/reviewsModel.js';

// add review ==========
export const addReview = async (req, res) => {
  const { name, rating, description, turfId } = req.body;
  const {id} = req.user;

  if (!name || !rating || !turfId)  return res.status(400).json({ msg: "Name, rating, and turf ID are required", ts: "error" });
  
  try {
    await review.create({ name, userid:id, rating, description });
    return res.status(201).json({ msg: "Review added successfully", ts: "success" });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", ts: "error" });
  }
};


// delete review ===========
export const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  
  if (!reviewId) return res.status(400).json({ msg: "Review ID is required", ts: "error" });
    
  try {
    const reviewToDelete =  await review.findByIdAndDelete(reviewId);
    
    if (!reviewToDelete) {
      return res.status(404).json({ msg: "Review not found", ts: "error" });
    }

    return res.status(200).json({ msg: "Review successfully deleted", ts: "success" });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", ts: "error" });
  }
};
