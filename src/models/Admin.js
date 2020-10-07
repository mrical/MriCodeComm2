import mongoose from "mongoose";
const Schema = mongoose.Schema;
const adminSchema = Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose?.models?.Admin || mongoose.model("Admin", adminSchema);
