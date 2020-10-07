import mongoose from "mongoose";
import Product from "./Product";
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const reviewSchema = new Schema(
  {
    productId: {
      type: ObjectId,
      ref: "Product",
    },
    userId: {
      type: ObjectId,
      ref: "User",
    },
    rating: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5],
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);
reviewSchema.post("save", async function () {
  await this.constructor.calculateAverage(this.productId);
});
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function (next) {
  await this.r.constructor.calculateAverage(this.r.productId);
});
reviewSchema.statics.calculateAverage = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { productId },
    },
    {
      $group: {
        _id: "$productId",
        nRatings: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  await Product.findByIdAndUpdate(productId, {
    nRatings: stats?.length > 0 ? stats[0]?.nRatings : 0,
    avgRating: stats?.length > 0 ? stats[0]?.avgRating : 0,
  });
};

export default mongoose.models.Review || mongoose.model("Review", reviewSchema);
