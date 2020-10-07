import { ensureUser } from "../../../../helpers/ensureLogin";
import initDB from "../../../../helpers/initDb";
import Product from "../../../../models/Product";
import Review from "../../../../models/Review";
import User from "../../../../models/User";

initDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await fetchReviews(req, res);
      break;
    case "POST":
      await createReview(req, res);
      break;
    case "OPTIONS":
      await res.status(201).json({});
      break;
  }
};

const fetchReviews = async (req, res) => {
  const { productId } = req.query;
  const reviews = await Review.find({ productId })
    .populate("userId", "name image")
    .sort({ createdAt: "desc" })
    .exec();
  res.status(200).json(reviews);
};
const createReview = async (req, res) => {
  await ensureUser(req, res);
  const { reviewDetails } = req.body;
  const review = await new Review(reviewDetails).save();
  const populatedReview = await Review.findById(review._id)
    .populate("userId", "name image email")
    .sort({ createdAt: "desc" })
    .exec();
  res.status(201).json(populatedReview);
  const user = await User.findById(reviewDetails.userId);
  user.reviews.push(review);
  await user.save();
  const product = await Product.findById(reviewDetails.productId);
  product.reviews.push(review);
  await product.save();
};
