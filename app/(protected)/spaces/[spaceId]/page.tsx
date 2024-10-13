'use client'

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

import SpaceHeader from '@/components/space-header'
import Stream from "@/components/stream";
import { LogOut, Share2, Users } from "lucide-react";
interface SpaceData {
    name: string;
    description: string;
    hostId:string
}


const Page = ({ params: { spaceId } }: { params: { spaceId: string } }) => {
    const [data,setData] = useState<SpaceData | null>(null)

    useEffect(() => {
        const fetchSpace = async () => {
            try {
                const response = await fetch(`/api/spaces/?spaceId=${spaceId}`, {
                    method: 'GET',
                });
                const data = await response.json();
                console.log(data.space);
                
                setData(data.space)
               
                return data;
            } catch (error) {
                console.error('Error fetching space:', error);
            }
        };
        fetchSpace(); 
    }, [spaceId]);

    const hostId = data?.hostId;
    return (

        
        <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* <SpaceHeader data={data as String[]} /> */}
            <div className="flex justify-between items-center">
            <div className="space-y-2">
                <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    {data?.name}
                </h1>
                <p className="text-gray-400 text-3xl">{data?.description}</p>
            </div>
            <div className="flex items-center space-x-4 flex-col-2">
                <div className="flex items-center space-x-2 bg-gray-800 rounded-full px-3 py-1">
                    <Users className="h-4 w-4 text-purple-400" />
                    <span className="text-sm font-medium">{42}</span>
                </div>
                <Button variant="outline" className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-gray-900">
                    <Share2
                        className="mr-2 h-4 w-4" />
                    Share
                </Button>
                <Button variant="outline" className="text-red-400 border-red-400 hover:bg-red-400 hover:text-gray-900">
                    <LogOut className="mr-2 h-4 w-4" />
                    Leave Space
                </Button>
            </div>
        </div>

            <Stream/>

    
            
          </div>
        </div>

      )
    }
export default Page;
