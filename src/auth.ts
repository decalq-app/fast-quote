import NextAuth from "next-auth";
import InstagramProvider from "next-auth/providers/instagram";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    }),
  ]
});