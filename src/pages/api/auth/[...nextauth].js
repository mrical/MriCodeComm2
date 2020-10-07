import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import initDB from "../../../helpers/initDb";
initDB();
const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
    }),

    // ...add more providers here
  ],
  pages: {
    signIn: "/auth/signin",
  },
  // A database is optional, but required to persist accounts in a database
  database: process.env.MONGO_URI,
};

export default (req, res) => NextAuth(req, res, options);
