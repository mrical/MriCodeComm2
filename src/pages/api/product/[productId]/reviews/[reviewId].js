import Review from "../../../../../models/Review";
import User from "../../../../../models/User";
import Product from "../../../../../models/Product";
import { ensureUser } from "../../../../../helpers/ensureLogin";
const { default: initDB } = require("../../../../../helpers/initDb");

initDB();

export default async (req, res) => {
  switch (req.method) {
    case "DELETE":
      await deleteReview(req, res);
      break;
    case "OPTIONS":
      await res.status(201).json({});
      break;
  }
};

const deleteReview = async (req, res) => {
  await ensureUser(req, res);
  const { reviewId } = req.query;
  const review = await Review.findByIdAndDelete(reviewId);
  res.status(200).json(review._id);
  const product = await Product.findById(review.productId);
  product.reviews.pull(review);
  await product.save();
  const user = await User.findById(review.userId);
  user.reviews.pull(review);
  await user.save();
};
