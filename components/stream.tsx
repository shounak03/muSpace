'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import { Play, Volume2, VolumeX } from "lucide-react";
import { PiArrowFatUpLight, PiArrowFatDownThin } from "react-icons/pi";
import { Slider } from "@/components/ui/slider"
import { Input } from './ui/input'
import { streamSchema } from '@/schema';
import { toast } from "sonner"
import { YT_REGEX } from '@/lib/utils';
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import { Card, CardContent } from './ui/card';
import Image from 'next/image';
import { SpaceHeader } from './space-header';
//@ts-ignore
import YouTubePlayer from "youtube-player";


interface SpaceData {
  spaceName?: string;
  spaceDesc?: string;
  isCreator?: boolean;
  spaceId: string
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
  const [volume, setVolume] = useState(50)
  const [isMuted, setIsMuted] = useState(false)
  const toggleMute = () => setIsMuted(!isMuted)
  const videoPlayer = useRef<HTMLDivElement>(null);


  async function refresh() {
    try {
      const res = await fetch(`/api/streams/?spaceId=${spaceId}`)
      const data = await res.json()
      setData(data)
      // setCurrentSong(data?.activeStream?.song)
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
      setCurrentSong((video) => {
        if (video?.extractedId === data.activeStream?.song?.extractedId) {
          return video;
        }
        return data.activeStream?.song || null;
      });
    } catch (error: any) {
      console.log(error.message);
      setQueue([]);
      setCurrentSong(null);
    }
  }


  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [spaceId]);

  
  useEffect(() => {
    if (!currentSong || !videoPlayer.current)
      return;

    const player = YouTubePlayer(videoPlayer.current,
      {
        videoId: currentSong.extractedId,
        host: 'https://www.youtube-nocookie.com',
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          enablejsapi: 1,
          fs: 0,
          modestbranding: 1,
          origin: window.location.origin,
          widget_referrer: window.location.origin,
        }
      }
    );
    player.playVideo();

    const eventHandler = (event: { data: number }) => {
      if (event.data === 0) {
        playNext();
      }
    };
    player.on("stateChange", eventHandler);

    return () => {
      player.destroy();
    };
  }, [currentSong, videoPlayer]);

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

  const playNext = async () => {
    if (queue.length > 0) {
      try {
        setNextSong(true);
        const data = await fetch(`/api/streams/next?spaceId=${spaceId}`, {
          method: "GET",
        });
        const json = await data.json();
        setCurrentSong(json.stream);
        setQueue((q) => q.filter((x) => x.id !== json.stream?.id));
      } catch (e) {
        console.error("Error playing next song:", e);
      } finally {
        setNextSong(false);
      }
    }
  };


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


  return (
    <>
      <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <SpaceHeader data={{ spaceName: data?.spaceName, spaceDesc: data?.spaceDesc, isCreator: data?.isCreator ?? false, spaceId: spaceId }} />

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
                      id={"url Id"}
                      title={"url song"}
                      params={`enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`}
                    />

                  </div>
                )}
              </CardContent>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white">Now Playing</h2>

          <Card className="bg-gray-800 border-gray-700 shadow-lg">
            <CardContent className="p-6 space-y-2">
              <div ref={videoPlayer} className="w-full aspect-video" style={{ pointerEvents: 'none' }}></div>

              {currentSong && playVideo &&
                <>
                  {/* <Image
                    width={150}
                    height={150}
                    src={currentSong.bigImg}
                    className="w-full aspect-video object-cover rounded-md"
                    alt={currentSong.title}
                  /> */}
                  <p className="mt-2 text-center font-semibold text-white">
                    {currentSong.title}
                  </p>
                  <p className="mt-2 text-center font-semibold text-white">
                    {currentSong.artist}
                  </p>
                </>
              }
              {!currentSong &&
                <p className="text-center py-8 text-gray-400">
                  No video playing
                </p>
              }
            </CardContent>
          </Card>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Next Up in Queue</h3>
            {queue.length === 0 ? (
              <Card className="bg-gray-800 border-gray-700 shadow-lg">
                <CardContent className="p-4 flex flex-col md:flex-row md:space-x-3">
                  <p className="text-center py-8 text-gray-400">
                    No Songs in queue
                  </p>
                </CardContent>
              </Card>
            ) : (
              queue.map((song) => (
                <div key={song.id} className="bg-gray-800 p-4 rounded-lg shadow flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <CardContent className="p-4 flex flex-col md:flex-row md:space-x-3">
                      <Image
                        width={60}
                        height={60}
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
                  </div>
                </div>
              )))}
          </div>



        </div>
      </div>
    </>
  )

}