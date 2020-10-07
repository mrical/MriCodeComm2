import { cloudinary } from "../../helpers/cloudinary";
import { ensureAdmin } from "../../helpers/ensureLogin";
import initDB from "../../helpers/initDb";

initDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await uploadToCloudinary(req, res);
      break;
    case "OPTIONS":
      await res.status(201).json({});
      break;
  }
};

const uploadToCloudinary = async (req, res) => {
  await ensureAdmin(req, res);
  try {
    console.log(req.body);
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "mricode-ecomm",
    });
    res.json({ url: uploadResponse.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
};
