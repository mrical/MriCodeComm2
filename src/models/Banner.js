import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bannerSchema = Schema({
  id: {
    type: String,
    default: "1235",
  },
  bannerUrl: {
    type: String,
    default:
      "https://res.cloudinary.com/dkis5gxl8/image/upload/v1601262094/Ramsey_Frost_qxx0nq.png",
  },
});

export default mongoose.models.Banner || mongoose.model("Banner", bannerSchema);
