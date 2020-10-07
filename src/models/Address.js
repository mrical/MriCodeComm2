import mongoose from "mongoose";
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

export const addressSchema = new Schema({
  userId: {
    type: ObjectId,
    required: true,
  },
  addressType: {
    type: String,
    enum: ["Home", "Office", "Shop"],
    default: "Others",
  },
  fullName: {
    type: String,
    required: true,
  },
  addressLineOne: {
    type: String,
    required: true,
  },
  addressLineTwo: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Address ||
  mongoose.model("Address", addressSchema);
