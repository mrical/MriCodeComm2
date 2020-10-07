import { ensureAdmin } from "../../../helpers/ensureLogin";
import initDB from "../../../helpers/initDb";
import Product from "../../../models/Product";
import User from "../../../models/User";

initDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await fetchProduct(req, res);
      break;
    case "PUT":
      await updateProduct(req, res);
      break;
    case "DELETE":
      await deleteProduct(req, res);
      break;
    case "OPTIONS":
      await res.status(201).json({});
      break;
  }
};
export async function fetchProductStatic(productId) {
  const product = await Product.findById(productId);
  return JSON.stringify(product);
}
const fetchProduct = async (req, res) => {
  const { productId } = req.query;
  const product = await Product.findById(productId);
  res.status(200).json(product);
};
const updateProduct = async (req, res) => {
  await ensureAdmin(req, res);
  const { productId } = req.query;
  const { productDetails } = req.body;
  await Product.findByIdAndUpdate(productId, productDetails);
  const product = await Product.findById(productId);
  res.status(201).json(product);
};
const deleteProduct = async (req, res) => {
  await ensureAdmin(req, res);
  const { productId } = req.query;
  const product = await Product.findByIdAndDelete(productId);
  await User.updateMany(
    { saved: productId },
    {
      $pull: {
        saved: productId,
      },
    }
  );
  res.status(201).json(product._id);
};
