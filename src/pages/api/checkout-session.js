import { ensureUser } from "../../helpers/ensureLogin";
import Address from "../../models/Address";
import Product from "../../models/Product";
import User from "../../models/User";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createCheckoutSession(req, res);
      break;
  }
};
const createCheckoutSession = async (req, res) => {
  await ensureUser(req, res);
  const { userId, productId, addressId, requestId } = req.body;
  const { email } = await User.findById(userId);
  const { price, discountedPrice, imageUrls, title } = await Product.findById(
    productId
  );
  const address = await Address.findById(addressId);
  const session = await stripe.checkout.sessions.create({
    cancel_url: `${process.env.NEXT_PUBLIC_BASEURL}/?message=paymentfailed`,
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "INR",
          product_data: {
            name: title,
            images: [imageUrls[0]],
          },
          unit_amount: (discountedPrice == 0 ? price : discountedPrice) * 100,
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_BASEURL}/paymentsuccess?requestId=${requestId}&userId=${userId}&sessionId={CHECKOUT_SESSION_ID}`,
  });
  res.json({ id: session.id });
};
