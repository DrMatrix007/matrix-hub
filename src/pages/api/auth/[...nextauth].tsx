import { models } from "@/models/models";
import { compare } from "bcrypt";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
    pages: {
        newUser: "/auth/signup",
        signIn: "/auth/signin",
    },
    providers: [
        Credentials({
            credentials: {
                username: { label: "username", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials, req) {
                if (credentials?.username && credentials.password) {

                    let u = await (await models.user).findOne({
                        username: credentials.username,
                    });
                    if (u && u.username && u.passwordHash) {
                        if (await compare(credentials.password, u.passwordHash)) {
                            return {
                                id: u.id,
                                email: u.email,
                                name: u.username,
                            };
                        }
                        throw new Error("Wrong password");
                    }
                    throw new Error("Internal error")
                }
                throw new Error("The user not found");
            },
        }),
    ],
};

export default NextAuth(authOptions);