import { ensureUser } from "../../../../../helpers/ensureLogin";
import transporter from "../../../../../helpers/initNodeMailer";
import Address from "../../../../../models/Address";
import Product from "../../../../../models/Product";
import Request from "../../../../../models/Request";
import User from "../../../../../models/User";

const { default: initDB } = require("../../../../../helpers/initDb");

initDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await requestProduct(req, res);
      break;
    case "OPTIONS":
      await res.status(201).json({});
      break;
  }
};

const requestProduct = async (req, res) => {
  await ensureUser(req, res);
  const { userId, productId } = req.query;
  const { requestDetails, addressId } = req.body;
  requestDetails.product = await Product.findById(productId);
  requestDetails.address = await Address.findById(addressId);
  const requestedProduct = await new Request(requestDetails).save();
  await User.findByIdAndUpdate(userId, {
    $push: {
      requested: { $each: [requestedProduct], $position: 0 },
    },
  });
  const requestedProductPopulated = await Request.findById(requestedProduct._id)
    .populate("userId", "name image email")
    .sort({ createdAt: "desc" })
    .exec();
  res.status(200).json(requestedProductPopulated);
  transporter.sendMail(
    {
      from: process.env.ADMIN_GMAIL,
      to: process.env.ADMIN_GMAIL,
      subject: "New Request Made",
      text: `Hey, Admin new Request is made please check that out\n`,
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
