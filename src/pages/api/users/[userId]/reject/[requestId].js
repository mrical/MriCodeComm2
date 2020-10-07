import { ensureAdmin } from "../../../../../helpers/ensureLogin";
import transporter from "../../../../../helpers/initNodeMailer";
import Reject from "../../../../../models/Reject";
import Request from "../../../../../models/Request";
import User from "../../../../../models/User";

const { default: initDB } = require("../../../../../helpers/initDb");

initDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await rejectProduct(req, res);
      break;
    case "OPTIONS":
      await res.status(201).json({});
      break;
  }
};

const rejectProduct = async (req, res) => {
  await ensureAdmin(req, res);
  const { userId, requestId } = req.query;
  const { rejectDetails } = req.body;
  await Request.findByIdAndUpdate(requestId, { status: "rejected" });
  const rejectedProduct = await new Reject(rejectDetails).save();
  const user = await User.findById(userId);
  user.rejected?.unshift(rejectedProduct);
  await user.save();
  await User.findOneAndUpdate(
    { "requested._id": requestId },
    {
      $set: {
        "requested.$.status": "rejected",
      },
    }
  );
  res.status(201).json(rejectedProduct);
  transporter.sendMail(
    {
      from: process.env.ADMIN_GMAIL,
      to: user.email,
      subject: "Product Rejected",
      text: `Hey, Sorry we are unable to Approve your Request on MriCodecom\n here is the message from MriCodecom : ${rejectDetails.message}`,
    },
    function (err) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Message Sent");
      }
    }
  );
};
