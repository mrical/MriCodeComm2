import { ensureAdmin } from "../../helpers/ensureLogin";
import initDB from "../../helpers/initDb";
import Approve from "../../models/Approve";

initDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await fetchApprovedRequests(req, res);
      break;
    case "OPTIONS":
      await res.status(201).json({});
      break;
  }
};
const fetchApprovedRequests = async (req, res) => {
  await ensureAdmin(req, res);
  const approvedRequests = await Approve.find();
  res.status(200).json(approvedRequests);
};
