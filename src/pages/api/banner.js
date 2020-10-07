import { ensureAdmin } from "../../helpers/ensureLogin";
import initDB from "../../helpers/initDb";
import Banner from "../../models/Banner";

initDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await fetchBanner(req, res);
      break;
    case "PUT":
      await updateBanner(req, res);
      break;
    case "OPTIONS":
      await res.status(201).json({});
      break;
  }
};
const fetchBanner = async (req, res) => {
  let banner = await Banner.findById("5f71601744ca8204548f4515");
  res.status(200).json(banner);
};
const updateBanner = async (req, res) => {
  await ensureAdmin(req, res);
  const { bannerUrl } = req.body;
  await Banner.findByIdAndUpdate("5f71601744ca8204548f4515", { bannerUrl });
  res.status(201).json({ bannerUrl });
};
