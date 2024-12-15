'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import { PiArrowFatUpLight, PiArrowFatDownThin } from "react-icons/pi";
import { Input } from './ui/input'
import { streamSchema } from '@/schema';
import { toast } from "sonner"
import { YT_REGEX } from '@/lib/utils';
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { Card, CardContent } from './ui/card';
import Image from 'next/image';
import { SpaceHeader } from './space-header';
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
  const videoPlayer = useRef<HTMLDivElement>(null);

  async function removeCurrentSongFromDB() {
    try {
      await fetch(`/api/streams/current`, {
        method: "DELETE",
        body: JSON.stringify({ spaceId })
      });
    } catch (error) {
      console.error("Error removing current song:", error);
    }
  }

  async function refresh() {
    try {

      const res = await fetch(`/api/streams/?spaceId=${spaceId}`)
      const data = await res.json()
      
      setData(data)
      
      if (data.streams && Array.isArray(data.streams)) {
        const sortedStreams = data.streams
          .sort((a: any, b: any) => b.upvotes - a.upvotes);
        
        setQueue(sortedStreams);
      }
      else {
        setQueue([]);
      }

      // Only update current song if it's different from the active stream
      setCurrentSong((prevSong) => {
        if (data?.activeStream?.song) {
          // If the active stream is different from the previous current song
          if (!prevSong || prevSong.id !== data.activeStream.song.id) {
            return data.activeStream.song;
          }
        }
        return prevSong;
      });
    } catch (error: any) {
      console.log(error.message);
      setQueue([]);
      setCurrentSong(null);
    } finally {
      setLoading(false)
    }
  }

  const playNext = async () => {
    // Remove the current song from the database first
    if (currentSong) {
      await removeCurrentSongFromDB();
    }

    if (queue.length > 0) {
      try {
        setNextSong(true);
        
        const data = await fetch(`/api/streams/next?spaceId=${spaceId}`, {
          method: "GET",
        });
        const json = await data.json();
        
        // Ensure we're not replaying the same song
        if (json.stream) {
          setCurrentSong(json.stream);
          setQueue((q) => q.filter((x) => x.id !== json.stream.id));
        } else {
          // If no new song, clear current song and queue
          setCurrentSong(null);
          setQueue([]);
        }
      } catch (e) {
        console.error("Error playing next song:", e);
        // Reset state if something goes wrong
        setCurrentSong(null);
        setQueue([]);
      } finally {
        setNextSong(false);
      }
    } else {
      // If queue is empty, clear the current song
      setCurrentSong(null);
    }
  };

  // Auto-play logic
  useEffect(() => {
    if (!currentSong && queue.length > 0 && !nextSong) {
      playNext();
    }
  }, [currentSong, queue, nextSong]);

  // Periodic refresh
  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [spaceId]);
  
  // YouTube Player setup
  useEffect(() => {
    if (!currentSong || !videoPlayer.current)
      return;

    const player = YouTubePlayer(videoPlayer.current,
      {
        videoId: currentSong.extractedId,
        host: 'https://www.youtube-nocookie.com',
        playerVars: {
          autoplay: 1,
          controls: 1,
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
        // Song ended, play next
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


  async function handleUpvote(songId: string, isUpvote: boolean) {
    setQueue(
      queue.map((song) => song.id === songId ? {
        ...song,
        upvotes: isUpvote ? song.upvotes + 1 : song.upvotes - 1,
        haveUpvoted: !song.haveUpvoted
      } : song).sort((a, b) => b.upvotes - a.upvotes)
    )
    await fetch(`/api/streams/upvote`, {
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
                  {loading ? "adding..." : "Add to Queue"}
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

          <Card className="bg-gray-800 border-gray-700 shadow-lg">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl font-bold text-white">Now Playing</h2>
              {currentSong ? (
                <div>
                  {playVideo ? (
                    <div
                      ref={videoPlayer}
                      className="w-full aspect-video"
                      style={{ pointerEvents: 'none' }}
                    />
                  ) : (
                    <>
                      <Image
                        src={currentSong.bigImg}
                        className="w-full aspect-video object-cover rounded-md"
                        alt={currentSong.title}
                        width={1920}
                        height={1080}
                      />
                      <p className="mt-2 text-center font-semibold text-white">
                        {currentSong.title}
                      </p>
                      <p className="mt-2 text-center font-semibold text-white">
                        {currentSong.artist}
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <p className="text-center text-gray-400">
                  No video playing
                </p>
              )}
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
                        className="md:w-40 mb-5 md:mb-0 object-cover rounded-md" 
                      />
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
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}




