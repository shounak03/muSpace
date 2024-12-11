import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'

function page() {

    return (
        <div className='flex flex-col min-h-screen items-center justify-center'>
            <h1 className='text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400  to-red-500'>Thanks for Joining</h1>
            <div className='flex justify-center items-center space-x-4 mt-4'>
                <Link href="/dashboard">
                    <Button type="submit" className="bg-purple-600 text-white hover:bg-purple-700">
                        Dashboard
                    </Button>
                </Link>
            </div>
        </div>
    );

}

export default page