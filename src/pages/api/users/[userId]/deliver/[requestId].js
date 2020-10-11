import { ensureAdmin } from "../../../../../helpers/ensureLogin";
import transporter from "../../../../../helpers/initNodeMailer";
import Request from "../../../../../models/Request";
import User from "../../../../../models/User";

const { default: initDB } = require("../../../../../helpers/initDb");

initDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await deliverProduct(req, res);
      break;
    case "OPTIONS":
      await res.status(201).json({});
      break;
  }
};

const deliverProduct = async (req, res) => {
  await ensureAdmin(req, res);
  const { userId, requestId } = req.query;
  await Request.findByIdAndUpdate(requestId, { status: "delivered" });
  const user = await User.findById(userId);
  user.delivered?.unshift({ requestId });
  const userAfterSave = await user.save();
  await User.findOneAndUpdate(
    { "requested._id": requestId },
    {
      $set: {
        "requested.$.status": "delivered",
      },
    }
  );
  res.status(201).json(userAfterSave);
  transporter.sendMail(
    {
      from: process.env.ADMIN_GMAIL,
      to: user.email,
      subject: "Product Delivered",
      text: `Hey, Thanks for your purchase Hope we see u again on MriCodecom\n\n Your product is sucessfully delivered to your prefered location`,
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
