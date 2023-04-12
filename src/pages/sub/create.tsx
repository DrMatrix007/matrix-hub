import Navbar from '@/components/navbar'
import React, { useState } from 'react'
import styles from "@/styles/Form.module.css"
import { userInput as useInput } from '@/hooks/use_input';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
export default function Create() {
    const [error, setError] = useState("");

    const [name, setName] = useInput();

    const router = useRouter();

    const createSub = async () => {
        try {
            await axios.post("/api/matrices/create", {
                name
            });
            router.push(`/sub/matrix/${name}`);
        } catch (e) {
            if (e instanceof AxiosError) {
                const err = e.response?.data?.message;
                setError(err || "Uknown error had occured");
            }
        }
    }

    return (
        <>
            <Navbar />
            <div className={`${styles.container} all`}>
                <div className='center'>
                    <div className='card' >
                        <h3 className={styles.title}>Create sub-matrix</h3>
                        <input onChange={setName} value={name} placeholder='name' />
                        <button onClick={() => createSub()} className='expand-top'>Create</button>
                        <p className={styles.error}>{error}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
