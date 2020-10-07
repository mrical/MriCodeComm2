import mongoose from "mongoose";
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;
export const rejectSchema = new Schema(
  {
    message: {
      type: String,
    },
    userHasRead: {
      type: Boolean,
      default: false,
    },
    productId: { type: ObjectId, ref: "Product" },
    requestId: { type: ObjectId },
  },
  { timestamps: true }
);

export default mongoose.models.Reject || mongoose.model("Reject", rejectSchema);
