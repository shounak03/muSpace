'use client'

import { useEffect, useState } from "react";
import LoadingScreen from "@/components/Loading";
import Stream from "@/components/stream";


const Page = ({ params: { spaceId } }: { params: { spaceId: string } }) => {
    
    const [hostId,setCreatorId]=useState<string>();
    const [loading1, setLoading1] = useState(true);


    useEffect(() => {
        const fetchSpace = async () => {
            try {
                const response = await fetch(`/api/spaces/?spaceId=${spaceId}`, {
                    method: 'GET',
                });
                const data = await response.json();
                if (!response.ok || !data.success) {
                    throw new Error(data.message || "Failed to retreive space's host id");
                }
                setCreatorId(data.space.hostId)
            } catch (error) {
                console.error('Error fetching space:', error);
            }
            finally{
                setLoading1(false)
            }
            
        };
        fetchSpace();
    }, [spaceId]);

    if (loading1) {
        return <LoadingScreen />;
    }
    return (


        <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
            <div className="max-w-4xl mx-auto space-y-8">                
              <Stream hostId={hostId as string} playVideo={true} spaceId={spaceId} />
            </div>
        
        </div>

    )
}
export default Page;
