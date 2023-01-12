import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { dbUsers } from "../../../database";

export default NextAuth ({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here

    Credentials({
      name: "Custom Login",
      credentials: {
        email: {
          label: "Correo:",
          type: "email",
          placeholder: "correo@google.com",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "Contraseña",
        },
      },
      async authorize(credentials) {
        console.log({credentials});
        // return { name: 'Juan', correo: 'juan@google.com', role: 'client', id: ''};
        return await dbUsers.checkUserEmailPassword( credentials!.email, credentials!.password )
        // Checkear ID  
      },
    }),
  ],

  session: {
    maxAge: 2592000, /// 30d
    strategy: 'jwt',
    updateAge: 86400, // cada día
  },


  // Callbacks
  callbacks:{

    async jwt({ token, account, user }) {
      // console.log({ token, account, user });
      if ( account ) {
        // token.accessToken = account.access_token

        switch ( account.type) {
          case 'oauth':
            // TODO: crear usuario o verificar si existe en mi db  
          break;
          case 'credentials':
            token.user = user;
            break;
          
        }
      }

      return token;
    },

    async session({ session, token, user }){
      // console.log({ session, token, user });

      // session.accessToken = token.accessToken 
      session.user = token.user as any;

      return session;
    }

  }
});


