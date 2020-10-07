import mongoose from "mongoose";
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;
import { requestSchema } from "./Request";
import { approveSchema } from "./Approve";
import { rejectSchema } from "./Reject";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    addresses: [
      {
        type: ObjectId,
        ref: "Address",
      },
    ],
    reviews: [
      {
        type: ObjectId,
        ref: "Review",
      },
    ],
    saved: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
    requested: [requestSchema || null],
    approved: [approveSchema],
    rejected: [rejectSchema],
    delivered: [
      {
        requestId: {
          type: ObjectId,
          ref: "Request",
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
