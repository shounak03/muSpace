
'use client'
import { CreateSpace } from "@/components/create-space-component";
import { JoinSpace } from "@/components/join-space";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter} from "next/navigation";
import { useEffect, useState } from "react";
import { HashLoader } from 'react-spinners';
import { toast } from "sonner";

interface SpaceData {
    space: {
        name: string,
        description: string,
        hostId: string
    }
}
interface SpaceId {
    spaceId: string
}



export default function Dashboard() {
    const [spaceId, setSpaceId] = useState<SpaceId>();

    const [space, setSpace] = useState(false)
    const [spacedata, setSpacedata] = useState<SpaceData>()
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function endSpace() {
        try {
            const id = spaceId?.spaceId
            console.log(id);
            
            const res = await fetch(`/api/streams`, {
                method: "DELETE",
                body: JSON.stringify({ spaceId:id }),
            });

            if (res.ok) {
                toast.success("Stream ended successfully");
                window.location.reload();

            } else {
                throw new Error('Failed to end stream');
            }
        } catch (error) {
            console.error("Error ending stream:", error);
            toast.error("Failed to end stream");
        }finally{
            router.refresh()
        }
    }
    
    const fetchSpace = async () => {
        setLoading(true)  // Start loading when we begin fetching
        try {
            const res = await fetch(`/api/getSpaceId`)
            const sp = await res.json()
            if (sp.success === true) {
                setSpaceId(sp)
                setSpace(true)

            } else {

                setLoading(false)  
            }
        } catch (error) {
            console.error("Error fetching space:", error)
            setLoading(false)  
        }
    }
    
    const fetchSpaceData = async () => {
        if (!spaceId) return;  
        
        setLoading(true)
        try {
            const res = await fetch(`/api/spaces/?spaceId=${spaceId.spaceId}`)
            const data = await res.json()
            // console.log(data);
    
            if (data.success === true) {
                setSpacedata(data)
            }
        } catch (error) {
            console.error("Error fetching space data:", error)
        } finally {
            setLoading(false)  
        }
    }
    
    useEffect(() => {
        fetchSpace()
    }, [])
    
    useEffect(() => {

        if (space) {
            fetchSpaceData()
        }
    }, [space, spaceId])  
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <HashLoader
                    color="white"
                    loading={true}
                    size={70}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        );
    }
    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100 mt-24">
            <div className="flex-1 flex flex-col items-center p-4 md:p-6">
                {!space && !spacedata && <main className="w-full max-w-4xl space-y-6">
                    <h1 className="text-3xl font-bold capitalize text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        Welcome back
                    </h1>
                    <section className="grid gap-4 lg:grid-cols-2 md:grid-cols-2">
                        <CreateSpace />
                        <JoinSpace />
                    </section>
                </main>}
                {space && spacedata && 
                    <div className="mt-8 justify-center items-center">
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                            You've an ongoing muSpace
                        </h1>

                        <div className="flex items-center justify-center w-[100%]">
                            <Card className="bg-gray-800 border-gray-700 mt-12 justify-center">
                                <CardHeader className="items-center">
                                    <CardTitle className="text-purple-400 text-2xl font-bold">{spacedata?.space?.name}</CardTitle>
                                    <CardDescription className="text-gray-400 text-xl">{spacedata?.space?.description}</CardDescription>

                                </CardHeader>
                                <CardContent>
                                    <div className="flex gap-4"> 
                                        <Button onClick={()=>{
                                            router.push(`/spaces/${spaceId?.spaceId}`)
                                        }} className="w-full bg-purple-600 text-white hover:bg-purple-700">
                                            Join Space
                                        </Button>

                                        <Button onClick={endSpace} className="w-full bg-red-700 text-white hover:bg-red-900">
                                            End Space
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                        </div>

                    </div>
                }
            </div>


        </div >
    )
}


