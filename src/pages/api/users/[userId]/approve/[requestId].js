import { ensureAdmin } from "../../../../../helpers/ensureLogin";
import transporter from "../../../../../helpers/initNodeMailer";
import Approve from "../../../../../models/Approve";
import Request from "../../../../../models/Request";
import User from "../../../../../models/User";

const { default: initDB } = require("../../../../../helpers/initDb");

initDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await approveProduct(req, res);
      break;
    case "OPTIONS":
      await res.status(201).json({});
      break;
  }
};

const approveProduct = async (req, res) => {
  await ensureAdmin(req, res);
  const { userId, requestId } = req.query;
  const { approveDetails } = req.body;
  await Request.findByIdAndUpdate(requestId, { status: "payment pending" });
  const approvedProduct = await new Approve(approveDetails).save();
  const user = await User.findById(userId);
  user.approved?.unshift(approvedProduct);
  await user.save();
  await User.findOneAndUpdate(
    { "requested._id": requestId },
    {
      $set: {
        "requested.$.status": "payment pending",
      },
    }
  );
  res.status(201).json(approvedProduct);
  transporter.sendMail(
    {
      from: process.env.ADMIN_GMAIL,
      to: user.email,
      subject: "Product approved",
      text: `Hey, Your product is successfull approved on MriCodecom\n\nhere is the message from MriCodecom\n\n${approveDetails.message}`,
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
