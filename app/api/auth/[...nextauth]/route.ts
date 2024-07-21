import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs';

const handler = NextAuth({
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login"
    },
    providers: [
        CredentialsProvider({
          credentials: {
            email: {},
            password: {}
          },
          async authorize(credentials) {
                const response = await fetch(`http://localhost:8001/api/account/search?value=${credentials?.email}&page=${1}&perPage=${1}`)
                const user = await response.json()

                if(user.body.total !== 0) {
                    // const passwordCorrect  = (credentials?.password === user.body.rows[0].password)
                    const passwordCorrect = await bcrypt.compare(credentials?.password as string, user.body.rows[0].password)

                    if(passwordCorrect){
                        return {
                            id: user.body.rows[0].uuid,
                            email: user.body.rows[0].username,
                            name: user.body.rows[0].fullname
                        }
                    }
                }

                return null
            }
        })
    ]
});

export { handler as GET, handler as POST };