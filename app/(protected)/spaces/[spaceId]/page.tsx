'use client'

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Music, Volume2, VolumeX, ThumbsUp, ThumbsDown, Play, Pause, Share2, Plus, Users, LogOut } from "lucide-react"


interface SpaceData {
    name: string;
    description: string;
}


const Page = ({ params: { spaceId } }: { params: { spaceId: string } }) => {
    const [data,setData] = useState<SpaceData | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(50)
    const [isMuted, setIsMuted] = useState(false)
    const [userCount, setUserCount] = useState(42) // Example user count

    const togglePlay = () => setIsPlaying(!isPlaying)
    const toggleMute = () => setIsMuted(!isMuted)

    // const [desc,setDesc] = useState("")

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


    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  {data?.name}
                </h1>
                <p className="text-gray-400">{data?.description}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gray-800 rounded-full px-3 py-1">
                  <Users className="h-4 w-4 text-purple-400" />
                  <span className="text-sm font-medium">{userCount}</span>
                </div>
                <Button variant="outline" className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-gray-900">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" className="text-red-400 border-red-400 hover:bg-red-400 hover:text-gray-900">
                  <LogOut className="mr-2 h-4 w-4" />
                  Leave Space
                </Button>
              </div>
            </div>
    
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="song-url" className="block text-sm font-medium text-gray-400">
                  Song URL
                </label>
                <div className="flex space-x-2">
                  <Input
                    id="song-url"
                    placeholder="Enter song URL here"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 flex-grow"
                  />
                  <Button className="bg-purple-600 text-white hover:bg-purple-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add to Queue
                  </Button>
                </div>
              </div>
            </div>
    
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-700 rounded-md flex items-center justify-center">
                  <Music className="h-10 w-10 text-gray-500" />
                </div>
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold">Currently Playing</h2>
                  <p className="text-gray-400">Artist - Song Name</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePlay}
                    className="text-purple-400 hover:text-purple-300"
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleMute}
                      className="text-purple-400 hover:text-purple-300"
                    >
                      {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                    </Button>
                    <Slider
                      value={[volume]}
                      max={100}
                      step={1}
                      className="w-24"
                      onValueChange={(value) => setVolume(value[0])}
                    />
                  </div>
                </div>
              </div>
            </div>
    
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Next Up in Queue</h3>
              {[1, 2, 3].map((index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg shadow flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-700 rounded-md flex items-center justify-center">
                      <Music className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium">Song Name {index}</p>
                      <p className="text-sm text-gray-400">Artist {index}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">3:45</span>
                    <Button variant="ghost" size="icon" className="text-green-400 hover:text-green-300">
                      <ThumbsUp className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300">
                      <ThumbsDown className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
export default Page;
