import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      token: string;
      expiry: number;
      email_id: String;
      first_name: String;
      middle_name?: String;
      last_name: String;
      password: String;
      id: String;
    };
  }
}
