import mongoose from "mongoose";
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const sessionSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    expires: {
      type: Date,
    },
    sessionToken: {
      type: String,
    },
    accessToken: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Session ||
  mongoose.model("Session", sessionSchema);
