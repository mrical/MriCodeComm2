import mongoose from "mongoose";
import { addressSchema } from "./Address";
import { productSchema } from "./Product";
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

export const requestSchema = new Schema(
  {
    message: {
      type: String,
    },
    size: {
      type: String,
    },
    product: productSchema,
    address: addressSchema,
    userId: { type: ObjectId, ref: "User" },
    adminHasRead: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "rejected",
        "delivered",
        "payment pending",
        "payment done",
      ],
      default: "pending",
    },
  },
  { timestamps: true }
);
export default mongoose.models.Request ||
  mongoose.model("Request", requestSchema);
