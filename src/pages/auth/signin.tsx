import Navbar from "@/components/navbar";
import { userInput as useInput } from "@/hooks/use_input";
import styles from "@/styles/Form.module.css";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

const SignUp = ({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    // const [email, setEmail] = useInput();
    const [username, setUsername] = useInput("drmatrix");
    const [password, setPassword] = useInput("12345");
    // const [password2, setPassword2] = useInput();
    const router = useRouter();
    const [error, setError] = useState("");

    const signInWithCreds = async () => {
        setError("");
        try {
            let res = await signIn("credentials", {
                redirect: false,
                username,
                password,
            });
            if (res) {
                if (res.error) {
                    setError(res.error);
                } else {
                    router.push("/");
                }
            }
        } catch (e) {
            if (e instanceof AxiosError) {
                const err = e.response?.data?.message;
                setError(err || "Uknown error had occured");
            }
        }
    }


    return <>
        <div className={" all"}>
            <Navbar />
            <div className={styles.container}>

                <div className={styles.animated_card}>
                    <h3 className="title">Enter Email and Password: </h3>
                    <input value={username} onChange={setUsername} placeholder="Username" />
                    <input value={password} onChange={setPassword} placeholder="Password" type="password" />
                    <button className={styles.the_button} onClick={() => signInWithCreds()}>
                        Sign In
                    </button>
                    {
                        error !== "" ?
                            <p className={styles.error}>{error}</p>
                            :
                            null
                    }
                    {Object.values(providers).filter(a => a.name !== "Credentials").map((provider) => (
                        <div key={provider.name}>
                            <button onClick={() => signIn(provider.id)}>
                                Sign in with {provider.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>;
};

export default SignUp;
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]";
import { useRouter } from "next/router";


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);

    // If the user is already logged in, redirect.
    // Note: Make sure not to redirect to the same page
    // To avoid an infinite loop!
    if (session) {
        return { redirect: { destination: "/" } };
    }

    const providers = await getProviders();

    return {
        props: { providers: providers ?? [] },
    }
}