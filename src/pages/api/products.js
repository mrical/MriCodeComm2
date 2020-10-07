import { ensureAdmin } from "../../helpers/ensureLogin";
import initDB from "../../helpers/initDb";
import Product from "../../models/Product";
initDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await fetchProducts(req, res);
      break;
    case "POST":
      await createProduct(req, res);
      break;
    case "OPTIONS":
      await res.status(201).json({});
      break;
  }
};
export async function fetchProductsForPaths() {
  const products = await Product.find()
    .select({ _id: 1 })
    .sort({ updatedAt: "desc" })
    .exec();
  return JSON.stringify(products);
}
const fetchProducts = async (req, res) => {
  const products = await Product.find().sort({ updatedAt: "desc" }).exec();
  res.status(201).json(products);
};
const createProduct = async (req, res) => {
  await ensureAdmin(req, res);
  const { productDetails } = req.body;
  const product = await new Product(productDetails).save();
  res.status(201).json(product);
};
