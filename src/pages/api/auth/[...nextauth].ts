import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";
import axios from "axios";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.

      //type userLogin = {
      //   emailID: string;
      //   password: string;
      // };

      credentials: {
        username: { label: "email_id", type: "text", placeholder: "" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        console.log(credentials);
        // const dev = process.env.NODE_ENV !== 'production';
        // const url=dev?"http://localhost:3000":process.env.NEXT
        const serverResponse = await axios.post(
          process.env.NEXT_PUBLIC_API_URL + "/auth/login",
          credentials
        );
        let user = serverResponse.data;
        // If no error and we have user data, return it
        console.log("Fail");
        if (user.success == true) {
          console.log("...nextAuth");
          let userData = {
            ...user.userExists,
            token: user.token,
            expiry: user.expiry,
          };
          userData.password = "";
          console.log(userData);
          return userData;
        }
        // Return null if user data could not be retrieved
        throw new Error(user.msg);
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: "Temp Change Later to proccess.env.SECRET",
  callbacks: {
    async session({ session, token }) {
      // TODO Fix it
      session.user = token.user as any;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};
export default NextAuth(authOptions);
