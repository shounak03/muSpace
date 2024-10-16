'use client'

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input"



// import { SpaceHeader } from '@/components/space-header'
// import Stream from "@/components/stream";
import { Music, Volume2, VolumeX, ThumbsUp, ThumbsDown, Play, Pause, Share2, Plus, Users, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoadingScreen from "@/components/Loading";
import Stream from "@/components/stream";
import Footer from "@/components/Footer";
import { Appbar } from "@/components/Appbar";
import { SpaceHeader } from "@/components/space-header";

interface SpaceData {
    name: string;
    description: string;
    hostId: string;
    userId: string;
}


const Page = ({ params: { spaceId } }: { params: { spaceId: string } }) => {
    const [hostId,setCreatorId]=useState<string>();
    const [userId,setuserId]=useState<string>();
    const [loading1, setLoading1] = useState(true);
    const [url,setUrl] = useState('');
    const [data, setData] = useState<SpaceData | null>(null)
    

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
                console.log(data);
                
                setData(data.space)
                setCreatorId(data.space.hostId)
                setuserId(data.userId)
                return data;
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

                {/* <Appbar/> */}
                <SpaceHeader data={{ name: data?.name, description: data?.description, hostId: data?.hostId,userId }} />
                
              <Stream hostId={hostId as string} playVideo={false} spaceId={spaceId} />
            </div>
        <Footer/>
        </div>

    )
}
export default Page;
