import initDB from "../../helpers/initDb";
import User from "../../models/User";

initDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await fetchUser(req, res);
      break;
    case "OPTIONS":
      await res.status(201).json({});
      break;
  }
};

const fetchUser = async (req, res) => {
  const {
    userDetails: { email },
  } = req.body;
  const user = await User.findOne({ email });
  const { _id, name, image, addresses } = user;
  res.status(201).json({ _id, name, image, email, addresses });
};
