import { parseCookies } from "nookies";
import Admin from "../models/Admin";
import Session from "../models/Session";
import initDB from "./initDb";
initDB();
export async function ensureAdmin(req, res) {
  const adminKey = parseCookies({ req })?.["admin-cookie"];
  if (adminKey) {
    const admin = await Admin.find({ password: adminKey });
    if (admin) {
      return;
    }
  }
  res.status(401).json({ message: "Not Authorized" });
}
export async function ensureUser(req, res) {
  const userKey = parseCookies({ req })?.[process.env.NEXT_PUBLIC_COOKIE_NAME];
  if (userKey) {
    const user = await Session.find({ sessionToken: userKey });
    if (user) {
      return;
    }
  }
  res.status(401).json({ message: "Not Authorized" });
}
