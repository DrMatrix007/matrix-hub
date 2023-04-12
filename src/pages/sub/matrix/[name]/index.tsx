import Navbar from '@/components/navbar';
import { models } from 'mongoose';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react'

const max = 50;
const min = 10;

export default function OpenMatrix() {
    const router = useRouter();

    const { name } = router.query;

    return (
        <>
            <div className='all'>
                <Navbar />
                <h1 className='title'>{name}</h1>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    let { countString } = context.query;
    
    const count = Number(countString) ?? 10;

    

    return {
        props: {
            // data: 
        },
    };
}