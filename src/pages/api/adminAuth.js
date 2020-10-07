import initDB from "../../helpers/initDb";
import bcrypt from "bcryptjs";
import Admin from "../../models/Admin";
import { parseCookies, setCookie, destroyCookie } from "nookies";
initDB();
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await loginAdmin(req, res);
      break;
    case "DELETE":
      await logoutAdmin(req, res);
      break;
    case "OPTIONS":
      await res.status(201).json({});
      break;
  }
};
const loginAdmin = async (req, res) => {
  const { loginDetails } = req.body;
  let admin;
  let isAdmin = false;
  const admins = await Admin.find({});
  admin = admins[0];
  if (admin) {
    if (admin.userName === loginDetails.userName) {
      isAdmin = await bcrypt.compare(loginDetails.password, admin.password);
    }
  } else {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hashSync(loginDetails.password, salt);
    admin = await new Admin({
      userName: loginDetails.userName,
      password: hash,
    }).save();
    isAdmin = true;
  }
  if (isAdmin) {
    setCookie({ res }, "admin-cookie", admin.password, {
      maxAge: 24 * 60 * 60,
      path: "/",
    });
    return res.status(201).json({});
  } else {
    res.status(201).json({ error: "invalid credentials" });
  }
};
const logoutAdmin = (req, res) => {
  destroyCookie({ res }, "admin-cookie", {
    path: "/",
  });
  const parsedCookies = parseCookies({ req });
  console.log(parsedCookies);
  res.status(201).json({});
};
