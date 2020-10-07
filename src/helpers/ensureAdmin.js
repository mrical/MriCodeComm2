import { parseCookies } from "nookies";
import initDB from "./initDb";
import Admin from "../models/Admin";
initDB();
export default async function isAdmin(ctx) {
  const adminKey = parseCookies(ctx)["admin-cookie"];
  if (adminKey) {
    const admin = await Admin.find({ password: adminKey });
    if (admin) {
      return true;
    }
  }
  return false;
}
