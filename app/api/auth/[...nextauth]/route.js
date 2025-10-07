import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const allowedDomain = process.env.ALLOWED_DOMAIN || ""; // opcional, ex: "gmail.com"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user }) {
      if (!allowedDomain) return true;
      const domain = (user?.email || "").split("@")[1] || "";
      return domain.toLowerCase() === allowedDomain.toLowerCase();
    }
  },
  pages: {
    signIn: "/api/auth/signin" // usa a página padrão do NextAuth
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
