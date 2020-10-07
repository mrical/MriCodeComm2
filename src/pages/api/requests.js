import { ensureAdmin, ensureUser } from "../../helpers/ensureLogin";
import initDB from "../../helpers/initDb";
import Approve from "../../models/Approve";
import Reject from "../../models/Reject";

import Request from "../../models/Request";
import User from "../../models/User";
initDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await fetchRequests(req, res);
      break;
    case "PUT":
      await markUserHasRead(req, res);
      break;
    case "OPTIONS":
      await res.status(201).json({});
      break;
  }
};
const fetchRequests = async (req, res) => {
  await ensureAdmin(req, res);
  try {
    const requests = await Request.find()
      .populate("userId", "name image email")
      .sort({ createdAt: "desc" })
      .exec();
    res.status(200).json(requests);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error });
  }
};
const markUserHasRead = async (req, res) => {
  await ensureUser(req, res);
  const { requestId } = req.body;
  await Approve.findOneAndUpdate({ requestId }, { userHasRead: true });
  await Reject.findOneAndUpdate({ requestId }, { userHasRead: true });
  await User.findOneAndUpdate(
    { "approved.requestId": requestId },
    {
      $set: {
        "approved.$.userHasRead": true,
      },
    }
  );
  await User.findOneAndUpdate(
    { "rejected.requestId": requestId },
    {
      $set: {
        "rejected.$.userHasRead": true,
      },
    }
  );
  res.status(201).json({ requestId });
};
