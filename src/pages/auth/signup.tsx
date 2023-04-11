import Navbar from "@/components/navbar";
import { userInput as useInput } from "@/hooks/use_input";
import styles from "@/styles/SignUp.module.css";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

const SignUp = () => {

    const [email, setEmail] = useInput("haviv.ofri@gmail.com");
    const [username, setUsername] = useInput("drmatrix");
    const [password, setPassword] = useInput("12345");
    const [password2, setPassword2] = useInput("12345");

    const [error, setError] = useState("");

    const signIn = async () => {
        if(password!==password2){
            return;
        }
        setError("");
        try {

                const values = {
                    email,
                    username,
                    password
                };
                console.log(values);
            await axios.post("/api/auth/signup",values);
        } catch (e) {
            if (e instanceof AxiosError) {
                const err = e.response?.data?.message;
                setError(err || "Uknown error had occured");
            }
        }
    }
    useEffect(() => {
        if (password != password2) {
            setError("passwords do not match!");
        } else {
            setError("");
        }
    }, [password, password2]);

    return <>
        <Navbar />
        <div className={styles.container + " all"}>
            <div className={styles.animated_card}>
                <h3 className={styles.title}>Enter Email and Password: </h3>
                <input value={email} onChange={setEmail} placeholder="Email"  />
                <input value={username} onChange={setUsername} placeholder="Username" />
                <input value={password} onChange={setPassword} placeholder="Password" type="password" />
                <input value={password2} onChange={setPassword2} placeholder="Repeat password" type="password"/>
                {
                    error === "" ? null :
                        <p className={styles.error}>{error}</p>
                }

                <button disabled={password!==password2} className={styles.the_button} onClick={() => signIn()}>
                    Sign Up
                </button>
            </div>
        </div>
    </>;
};

export default SignUp;