import { ensureUser } from "../../../../../helpers/ensureLogin";
import Address from "../../../../../models/Address";
import User from "../../../../../models/User";

const { default: initDB } = require("../../../../../helpers/initDb");

initDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await fetchAddress(req, res);
      break;
    case "PUT":
      await updateAddress(req, res);
      break;
    case "DELETE":
      await deleteAddress(req, res);
      break;
    case "OPTIONS":
      await res.status(201).json({});
      break;
  }
};
const fetchAddress = async (req, res) => {
  await ensureUser(req, res);
  const { addressId, userId } = req.query;
  const address = await Address.findById(addressId);
  res.status(200).json(address);
};
const updateAddress = async (req, res) => {
  await ensureUser(req, res);
  const { addressId } = req.query;
  const { addressDetails } = req.body;
  await Address.findByIdAndUpdate(addressId, addressDetails);
  const address = await Address.findById(addressId);
  res.status(201).json(address);
};
const deleteAddress = async (req, res) => {
  await ensureUser(req, res);
  const { userId, addressId } = req.query;
  await Address.findByIdAndDelete(addressId);
  const user = await User.findById(userId);
  user.addresses.pull(addressId);
  user.save();
  res.status(200).json(addressId);
};
