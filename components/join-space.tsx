'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import LoadingScreen from "./Loading";

export const JoinSpace = () => {
    const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false)
    const [loading,setLoading] = useState(false)
    const [url, setUrl] = useState('');
    const router = useRouter();
    async function joinSpace() {
        if(url){
            setLoading(true);
            toast.success("Joining the space");
            router.push(url);
        }
        else if(url){
            toast.error("Space not found");
        }
        
    }
    if(loading)
        return <LoadingScreen/>
    return (
        <>
            <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                    <CardTitle className="text-pink-400">Join an Existing Space</CardTitle>
                    <CardDescription className="text-gray-400">Enter a space URL to join friends</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button 
                        className="w-full bg-pink-600 text-white hover:bg-pink-700"
                        onClick={() => setIsJoinDialogOpen(true)}
                    >
                        Join Space
                    </Button>
                </CardContent>
            </Card>

            <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
                <DialogContent className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-gray-800 text-gray-100 p-6 rounded-lg w-full max-w-md border border-pink-500 shadow-lg">
                        <DialogHeader>
                            <DialogTitle className="text-pink-400">Join a Space</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                            <Input 
                                placeholder="Enter space URL" 
                                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}

                            />
                            <Button className="w-full bg-pink-600 text-white hover:bg-pink-700" onClick={joinSpace}>
                                Join
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}