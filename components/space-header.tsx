import { LogOut, Share2, Users } from 'lucide-react';
import React from 'react'
import { Button } from './ui/button';
interface SpaceData {
    name?: string;
    description?: string;
}


export default function SpaceHeader({ data }: { data?: SpaceData }) {
    return (
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
    )
}
