

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Play, Share2, VoteIcon, Vote } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-gray-100 items-center justify-center">
      <main className="w-full max-w-6xl mx-auto px-4">
        <section className="relative w-full py-12 md:py-20 lg:py-28 xl:py-48 rounded-3xl overflow-hidden">
          {/* Advanced Grid Background */}
          <div className="absolute inset-0 
            bg-[linear-gradient(to_right,rgba(139,92,246,0.05)_1px,transparent_1px),
            linear-gradient(to_bottom,rgba(139,92,246,0.05)_1px,transparent_1px)] 
            bg-[size:4rem_4rem] 
            opacity-600 
            pointer-events-none"
          />
          
          <div className="container relative px-4 md:px-6 z-10">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl 
                  text-transparent bg-clip-text 
                  bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 
                  animate-gradient-x">
                  Sync Sounds, Create Moments
                </h1>
                <p className="mx-auto max-w-[800px] text-gray-300 text-lg md:text-xl">
                  Revolutionize your music experience. Create shared listening spaces, 
                  vote on tracks, and enjoy synchronized music with friends across the globe.
                </p>
              </div>
              <div className="flex space-x-4">
                <Link href={"/dashboard"}>
                
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 
                    hover:from-purple-700 hover:to-pink-700 
                    transition-all duration-300  mt-4
                    shadow-lg hover:shadow-xl"
                    >
                    Try it for free
                  </Button>
                  </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="relative w-full py-12 md:py-24 lg:py-32 my-6 rounded-3xl overflow-hidden">
          {/* Sophisticated Dotted Background */}
          <div className="absolute inset-0 
            bg-[radial-gradient(rgba(139,92,246,0.1)_1px,transparent_1px)] 
            [background-size:16px_16px] 
            opacity-50 
            pointer-events-none"
          />
          
          <div className="container relative px-4 md:px-6 z-10">
            <h2 className="text-4xl font-extrabold tracking-tight text-center mb-16 
              text-transparent bg-clip-text 
              bg-gradient-to-r from-purple-400 to-pink-500">
              Your Musical Journey Simplified
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
              {[
                { 
                  icon: <Users/>,
                  title: 'Create Space', 
                  description: 'Craft your unique musical sanctuary in moments.',
                  color: 'bg-purple-600'
                },
                { 
                  icon: <Share2/>, 
                  title: 'Invite Friends', 
                  description: 'Connect with your crew and share the vibe.',
                  color: 'bg-pink-600'
                },
                { 
                  icon: <Vote/>, 
                  title: 'Vote & Curate', 
                  description: 'Democratize your playlist with group voting.',
                  color: 'bg-indigo-600'
                },
                { 
                  icon: <Play/>, 
                  title: 'Sync & Enjoy', 
                  description: 'Experience music together, no matter the distance.',
                  color: 'bg-rose-600'
                }
              ].map((step, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center space-y-4 p-6 
                    rounded-2xl bg-gray-800/60 backdrop-blur-sm 
                    border border-gray-700/50 
                    hover:border-purple-500/50 
                    transition-all duration-300 
                    hover:scale-105 
                    hover:shadow-2xl"
                >
                  <div className={`${step.color} text-white rounded-full w-16 h-16 
                    flex items-center justify-center text-3xl font-bold mb-4 
                    transform transition-transform duration-300 group-hover:rotate-12`}>
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-purple-400">{step.title}</h3>
                  <p className="text-gray-300 text-center">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}