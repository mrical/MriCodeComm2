import { ensureAdmin, ensureUser } from "../../../../helpers/ensureLogin";
import initDB from "../../../../helpers/initDb";
import Address from "../../../../models/Address";
import User from "../../../../models/User";

initDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await fetchAddresses(req, res);
      break;
    case "POST":
      await createAddress(req, res);
      break;
    case "OPTIONS":
      await res.status(201).json({});
      break;
  }
};

const fetchAddresses = async (req, res) => {
  await ensureUser(req, res);
  const { userId } = req.query;
  const addresses = await Address.find({ userId });
  res.status(200).json(addresses);
};
const createAddress = async (req, res) => {
  await ensureUser(req, res);
  const { userId } = req.query;
  const { addressDetails } = req.body;
  const address = await new Address(addressDetails).save();
  res.status(201).json(address);
  const user = await User.findById(userId);
  user.addresses.push(address);
  await user.save();
};
