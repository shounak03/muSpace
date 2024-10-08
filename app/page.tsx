
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Music, Users, Play, Share2 } from "lucide-react"
import Link from "next/link"
import dynamic from 'next/dynamic'
// import { Redirect } from "@/components/Redirect"
// const Appbar = dynamic(() => import('@/components/Appbar'), { ssr: false })


import Footer from "@/components/Footer"
import { Appbar } from "@/components/Appbar"

export default function LandingPage() {
  return (

    <>

    <Appbar />
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100 items-center justify-between">

      
      
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter p-2 sm:text-4xl md:text-5xl lg:text-6xl/none text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  Listen Together, Anywhere
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Create your own music space, invite friends, and enjoy synchronized listening experiences. Your music, your rules.
                </p>
              </div>
              <div className="space-x-4">
                <Link href={'/dashboard'}>
                  <Button className="bg-purple-600 text-white hover:bg-purple-700">Create a Space</Button>
                </Link>
                  <Button variant="outline" className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-gray-900">Join a Space</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-8 md:py-24 lg:py-24 bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Features</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-gray-700">
                <Users className="h-10 w-10 mb-2 text-purple-400" />
                <h3 className="text-xl font-bold text-purple-400">Create Spaces</h3>
                <p className="text-gray-300 text-center">Host your own music room and invite friends to join.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-gray-700">
                <Play className="h-10 w-10 mb-2 text-pink-400" />
                <h3 className="text-xl font-bold text-pink-400">Synchronized Playback</h3>
                <p className="text-gray-300 text-center">Listen in perfect sync with everyone in your space.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-gray-700">
                <Share2 className="h-10 w-10 mb-2 text-blue-400" />
                <h3 className="text-xl font-bold text-blue-400">Collaborative Playlists</h3>
                <p className="text-gray-300 text-center">Build playlists together in real-time.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">How It Works</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-gray-800">
                <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold mb-2">1</div>
                <h3 className="text-xl font-bold text-purple-400">Create a Space</h3>
                <p className="text-gray-400 text-center">Set up your music room in seconds.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-gray-800">
                <div className="bg-pink-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold mb-2">2</div>
                <h3 className="text-xl font-bold text-pink-400">Invite Friends</h3>
                <p className="text-gray-400 text-center">Share your space link with friends.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-gray-800">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold mb-2">3</div>
                <h3 className="text-xl font-bold text-blue-400">Enjoy Together</h3>
                <p className="text-gray-400 text-center">Start listening and enjoy music in sync!</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-800 to-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Ready to Start Your Music Journey?</h2>
                <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl">
                  Join MusicSpace today and experience the joy of listening together.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400" placeholder="Enter your email" type="email" />
                  <Button type="submit" className="bg-purple-600 text-white hover:bg-purple-700">Get Started</Button>
                </form>
                <p className="text-xs text-gray-400">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2 hover:text-purple-400" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800">
        <p className="text-xs text-gray-400">© 2024 MusicSpace. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:text-purple-400 transition-colors" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:text-purple-400 transition-colors" href="#">
            Privacy
          </Link>
        </nav> */}
      {/* </footer> */}
      <Footer/>
    </div>
    </>
  )
}