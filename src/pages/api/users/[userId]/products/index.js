import { ensureUser } from "../../../../../helpers/ensureLogin";
import User from "../../../../../models/User";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await fetchUserProducts(req, res);
      break;
    case "OPTIONS":
      await res.status(201).json({});
      break;
  }
};
const fetchUserProducts = async (req, res) => {
  await ensureUser(req, res);
  const { userId } = req.query;
  const userProducts = await User.findById(userId, {
    saved: 1,
    requested: 1,
    approved: 1,
    rejected: 1,
    _id: 0,
  })
    .populate("requested.userId", "name image email")
    .exec();
  res.status(200).json(userProducts);
};
