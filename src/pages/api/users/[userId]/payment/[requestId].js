import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import { ensureUser } from "../../../../../helpers/ensureLogin";
import initDB from "../../../../../helpers/initDb";
import Request from "../../../../../models/Request";
import User from "../../../../../models/User";
initDB();
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await paymentProduct(req, res);
      break;
    case "OPTIONS":
      await res.status(201).json({});
      break;
  }
};

const paymentProduct = async (req, res) => {
  await ensureUser(req, res);
  const { requestId, userId } = req.query;
  const { sessionId } = req.body;
  let session;
  if (sessionId) {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  }
  if (session.payment_status === "paid") {
    await Request.findByIdAndUpdate(requestId, { status: "payment done" });
    await User.findOneAndUpdate(
      { "requested._id": requestId },
      {
        $set: {
          "requested.$.status": "payment done",
        },
      }
    );
    res.status(201).json({ success: "payment done" });
    const user = await User.findById(userId);
    transporter.sendMail(
      {
        from: process.env.ADMIN_GMAIL,
        to: user.email,
        subject: "Payment Success",
        text: `Hey, Your payment is successfully done on MriCodecom\n`,
      },
      function (err) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Message Sent");
        }
      }
    );
  } else {
    res.status(401).json({ error: "invalid session" });
    const user = await User.findById(userId);
    transporter.sendMail(
      {
        from: process.env.ADMIN_GMAIL,
        to: user.email,
        subject: "Payment Failed",
        text: `Hey, Your payment is Failed please try again on MriCodecom\n`,
      },
      function (err) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Message Sent");
        }
      }
    );
  }
};
