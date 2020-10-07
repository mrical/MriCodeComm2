const { default: initDB } = require("../../../../../helpers/initDb");
import { ensureUser } from "../../../../../helpers/ensureLogin";
import Product from "../../../../../models/Product";
import User from "../../../../../models/User";
initDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await saveProduct(req, res);
      break;
    case "DELETE":
      await unsaveProduct(req, res);
      break;
    case "OPTIONS":
      await res.status(201).json({});
      break;
  }
};

const saveProduct = async (req, res) => {
  await ensureUser(req, res);
  const { userId, productId } = req.query;
  const user = await User.findById(userId, { saved: 1, _id: 0 });
  if (!user.saved?.includes(productId)) {
    await User.findByIdAndUpdate(userId, {
      $push: {
        saved: { $each: [productId], $position: 0 },
      },
    });
  }

  res.status(201).json(productId);
};
const unsaveProduct = async (req, res) => {
  await ensureUser(req, res);
  const { userId, productId } = req.query;
  await User.findByIdAndUpdate(userId, {
    $pull: {
      saved: productId,
    },
  });
  res.status(200).json(productId);
};
