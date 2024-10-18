// 'use client'
import { Appbar } from "@/components/Appbar";
import { CreateSpace } from "@/components/create-space-component";
import { JoinSpace } from "@/components/join-space";
import Footer from "@/components/Footer";

import { useEffect } from "react";


export default function Dashboard() {




    // useEffect(() => {
    //     const fetchSpace = async () => {
    //         try {
    //             const response = await fetch('api/getSpaceId')
    //             const data = await response.json();
    //             console.log(data);

    //         } catch (error) {
    //             console.log(error)
    //         }
    //     };
    //     fetchSpace(); 
    // }, []);

    // const fetchSpace = async () => {
    //     try {
    //         const response = await fetch('api/getSpaceId')
    //         const data = await response.json();
    //         console.log(data);

    //     } catch (error) {
    //         console.log(error)
    //     }
    // };

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
            <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6">
                <main className="w-full max-w-4xl space-y-6">
                    <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        Welcome to Your Dashboard
                    </h1>
                    <section className="grid gap-4 md:grid-cols-2">
                        <CreateSpace />
                        <JoinSpace />
                    </section>
                </main>
            </div>
        </div>
    )
}