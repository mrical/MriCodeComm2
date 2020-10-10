import mongoose from "mongoose";
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

export const productSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrls: [
      {
        type: String,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    sizes: [{ type: String, enum: ["small", "medium", "large", "extralarge"] }],
    category: {
      type: String,
      enum: [
        "Sweatshirts",
        "Shirts",
        "Jeans",
        "Joggers",
        "Caps & Hats",
        "Glasses",
        "Watches",
        "Traditional",
        "Others",
      ],
      default: "Others",
    },
    nRatings: {
      type: Number,
      default: 0,
    },
    avgRating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        type: ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
