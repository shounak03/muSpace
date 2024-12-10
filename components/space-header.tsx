// 'use server'
import { LogOut, Share2 } from 'lucide-react';
import React from 'react'
import { Button } from './ui/button';
import { toast } from 'sonner';


interface SpaceData {
    spaceName?: string;
    spaceDesc?: string;
    isCreator:boolean
    spaceId:string
}


export const SpaceHeader = ({ data }: { data?: SpaceData }) =>{

    function shareVideo(){
        // share video logic
        const shareableLink = `${window.location.hostname}/spaces/${data?.spaceId}`
        navigator.clipboard.writeText(shareableLink).then(() => {
            toast.success('Link copied to clipboard!')
          }).catch((err) => {
            console.error('Could not copy text: ', err)
            toast.error('Failed to copy link. Please try again.')
          })
    }

    return (
        <div className="flex justify-between items-center">
                    <div className="space-y-2">
                        <h1 className="text-6xl capitalize font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                            {data?.spaceName}
                        </h1>
                        <p className="text-gray-400 text-3xl">{data?.spaceDesc}</p>
                    </div>
                    <div className="flex items-center space-x-4 flex-col-2">
                        <Button variant="outline" className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-gray-900" onClick={shareVideo}>
                            <Share2
                                className="mr-2 h-4 w-4" />
                            Share
                        </Button>
                        {data?.isCreator &&
                        <Button variant="outline" className="text-red-400 border-red-400 hover:bg-red-400 hover:text-gray-900">
                            <LogOut className="mr-2 h-4 w-4" />
                            End Space
                        </Button>}
                        {!data?.isCreator &&
                        <Button variant="outline" className="text-red-400 border-red-400 hover:bg-red-400 hover:text-gray-900">
                            <LogOut className="mr-2 h-4 w-4" />
                            Leave Space
                        </Button>
                        }
                    </div>
                </div>
    )
}
