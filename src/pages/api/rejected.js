import { ensureAdmin } from "../../helpers/ensureLogin";
import initDB from "../../helpers/initDb";
import Reject from "../../models/Reject";

initDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await fetchRejectedRequests(req, res);
      break;
    case "OPTIONS":
      await res.status(201).json({});
      break;
  }
};
const fetchRejectedRequests = async (req, res) => {
  await ensureAdmin(req, res);
  const rejectedRequests = await Reject.find();
  res.status(200).json(rejectedRequests);
};
