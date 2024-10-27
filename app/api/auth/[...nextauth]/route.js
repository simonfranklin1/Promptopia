import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const generateUserName = (name) => {
    const nameLowerCaseWithoutSpaces = name.replace(/\s/g, "").toLowerCase();
    const randomNumber = Math.floor(Math.random() * 1000);
    return `${nameLowerCaseWithoutSpaces}${randomNumber}`;
  }

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            await connectToDB();
            
            const sessionUser = await User.findOne({
                email: session?.user.email
            })

            session.user.id = sessionUser._id.toString();

            return session;
        },
        async signIn({ profile }) {
            try {
                await connectToDB();

                // checar se o usuário já existe

                const alreadyExistingUser = await User.findOne({
                    email: profile.email
                })

                // senão, criar um novo usuário

                if (!alreadyExistingUser) {
                    await User.create({
                        username: generateUserName(profile.name),
                        email: profile.email,
                        image: profile.picture
                    })
                }

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
})

export { handler as GET, handler as POST }