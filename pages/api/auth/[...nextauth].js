/*import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { db } from '../../../firebaseAdmin';

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        // Add logic here to verify user credentials from your database
        const user = { id: 1, name: 'User' };
        return user ?? null;
      }
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Providers.Microsoft({
      clientId: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET
    })
  ],
  callbacks: {
    async signIn(user) {
      const userRef = db.collection('users').doc(user.id.toString());
      const doc = await userRef.get();
  
      if (!doc.exists) {
        await userRef.set({
          name: user.name,
          email: user.email,
          createdAt: new Date(),
        });
      }
  
      return true;
    },
    async session(session, token) {
      session.user.id = token.id;
      return session;
    }
  }
});
*/
