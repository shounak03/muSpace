'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import { Music, Volume2, VolumeX, ThumbsUp, ThumbsDown, Play, Pause, Share2, Plus, Users, LogOut } from "lucide-react";
import { PiArrowFatUpLight, PiArrowFatDownThin } from "react-icons/pi";
import { Slider } from "@/components/ui/slider"
import { Input } from './ui/input'
import { streamSchema } from '@/schema';
import { toast } from "sonner"
import { YT_REGEX } from '@/lib/utils';
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import { CardContent } from './ui/card';
import Image from 'next/image';
import { SpaceHeader } from './space-header';


interface SpaceData {
  spaceName?: string;
  spaceDesc?: string;
  isCreator?: boolean;
  spaceId:string
}

interface Video {
  id: string;
  type: string;
  url: string;
  extractedId: string;
  title: string;
  bigImg: string;
  smallImg: string;
  active: boolean;
  userId: string;
  upvotes: number;
  haveUpvoted: boolean;
  spaceId: string;
  artist: string;
}
const REFRESH_INTERVAL_MS = 10 * 1000;
export default function Stream({
  hostId,
  playVideo = false,
  spaceId
}: {
  hostId: string;
  playVideo: boolean;
  spaceId: string;
}) {



  const [url, setUrl] = useState("");
  const [queue, setQueue] = useState<Video[]>([]);
  const [data, setData] = useState<SpaceData>()
  const [currentSong, setCurrentSong] = useState<Video | null>(null);
  const [nextSong, setNextSong] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(50)
  const [isMuted, setIsMuted] = useState(false)
  const togglePlay = () => setIsPlaying(!isPlaying)
  const toggleMute = () => setIsMuted(!isMuted)
  const videoPlayer = useRef<HTMLDivElement>(null);

  async function refresh() {
    try {
      const res = await fetch(`/api/streams/?spaceId=${spaceId}`)
      const data = await res.json()
      console.log(data);
      setData(data)
      if (data.streams && Array.isArray(data.streams)) {
        setQueue(
          data.streams.length > 0
            ? data.streams.sort((a: any, b: any) => b.upvotes - a.upvotes)
            : [],
        );
      }
      else {

        setQueue([]);
      }

    } catch (error: any) {
      console.log(error.message);

    }
  }

  useEffect(() => {
    refresh();
  }, [spaceId])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) {
      toast.error("Song url cannot cannot be empty")
    }
    if (!url.match(YT_REGEX)) {
      toast.error("Invalid YouTube URL format");
      return;
    }
    setLoading(true);
    try {
      const postData = streamSchema.parse({ url, hostId, spaceId });
      const response = await fetch(`/api/streams`, {
        method: 'POST',
        headers: { 'content-type': "application/json" },
        body: JSON.stringify(postData)
      })
      const data = await response.json();
      console.log(data);
      if (!response.ok)
        throw new Error(data.message || "An error occured")

      setQueue([...queue, data])
      setUrl("")
      toast.success("song added to queue successfully")
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleUpvote(songId: string, isUpvote: boolean) {

    setQueue(
      queue.map((song) => song.id === songId ? {
        ...song,
        upvotes: isUpvote ? song.upvotes + 1 : song.upvotes - 1,
        haveUpvoted: !song.haveUpvoted
      } : song).sort((a, b) => b.upvotes - a.upvotes)
    )
    const resp = await fetch(`/api/streams/upvote`, {
      method: isUpvote ? "POST" : "DELETE",
      body: JSON.stringify({ songId })
    })
  }

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [spaceId]);





  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-8">

        <SpaceHeader data={{ spaceName: data?.spaceName, spaceDesc: data?.spaceDesc, isCreator: data?.isCreator ?? false, spaceId:spaceId}}  />
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="song-url" className="block text-sm font-medium text-gray-400">
              Song URL
            </label>
            {/* <div className="flex space-x-2"> */}
            <form className="space-y-3" onSubmit={handleSubmit}>
              <Input
                id="song-url"
                placeholder="Enter song URL here"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 flex-grow"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}

              />

              <Button
                disabled={loading}
                type="submit"
                className="bg-purple-600 text-white hover:bg-purple-700" >
                {loading ? "Loading..." : "Add to Queue"}

              </Button>
            </form>
            <CardContent>

              {url && url.match(YT_REGEX) && !loading && (
                <div className="mt-4">
                  <LiteYouTubeEmbed
                    title=""
                    id={url.split("?v=")[1]}
                  />
                </div>
              )}
            </CardContent>
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
            {/* <CardContent className="p-4 flex flex-col md:flex-row md:space-x-3">
                  <Image  
                      width={120}
                      height={120}
                      alt='thumbnail'
                      src={"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dreamstime.com%2Fillustration%2Fprofile-icon.html&psig=AOvVaw1NIkVeU9nxbBJw7knyA0da&ust=1729187153798000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMiT46K6k4kDFQAAAAAdAAAAABAE"} 
                      className="md:w-40 mb-5 md:mb-0 object-cover rounded-md" />
                <div>
                  <p className="font-medium">song name</p>
                  <p className="text-sm text-gray-400">artist</p>
                </div>
                </CardContent> */}
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
          {queue.map((song) => (
            <div key={song.id} className="bg-gray-800 p-4 rounded-lg shadow flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <CardContent className="p-4 flex flex-col md:flex-row md:space-x-3">
                  <Image
                    width={120}
                    height={120}
                    alt='thumbnail'
                    src={song.smallImg}
                    className="md:w-40 mb-5 md:mb-0 object-cover rounded-md" />
                  <div>
                    <p className="font-medium">{song.title}</p>
                    <p className="text-sm text-gray-400">{song.artist}</p>
                  </div>
                </CardContent>
              </div>
              <div className="flex items-center space-x-1 ml-8">
                {/* <span className="text-sm text-gray-400">3:45</span> */}
                <Button
                  variant="ghost"
                  size="icon"
                  className={`hover:bg-gray-700 ${!song.haveUpvoted ? 'text-green-400' : 'text-red-400'}`}
                  onClick={() => handleUpvote(song.id, song.haveUpvoted ? false : true)}
                >
                  {!song.haveUpvoted ? (
                    <PiArrowFatUpLight className="h-8 w-8" />
                  ) : (
                    <PiArrowFatDownThin className="h-8 w-8" />
                  )}
                </Button>

                <span>{song.upvotes}</span>
                {/* <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300">
                  <ThumbsDown className="h-5 w-5" />
                </Button> */}
              </div>
            </div>
          ))}
        </div>



      </div>
    </div>
  )

}