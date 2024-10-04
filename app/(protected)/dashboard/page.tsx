

'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Music, Users, Play, Share2 } from "lucide-react"
import Link from "next/link"
// import Appbar from '@/components/Appbar'
import { Appbar } from '@/components/Appbar'

export default function Dashboard() {
    const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false)
    const [isNewSpaceDialogOpen, setIsNewSpaceDialogOpen] = useState(false)

    const recommendedSpaces = [
        { id: 1, name: "Chill Vibes", members: 42, genre: "Lo-fi" },
        { id: 2, name: "Rock Legends", members: 78, genre: "Classic Rock" },
        { id: 3, name: "EDM Party", members: 103, genre: "Electronic" },
    ]

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">

            <Appbar />
            <main className="flex-1 p-4 md:p-6 space-y-6">
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    Welcome to Your Dashboard
                </h1>
                <section className="grid gap-4 md:grid-cols-2">

                    <Card className="bg-gray-800 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-purple-400">Create a New Space</CardTitle>
                            <CardDescription className="text-gray-400">Start your own music listening room</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Dialog open={isNewSpaceDialogOpen} onOpenChange={setIsNewSpaceDialogOpen}>
                                <DialogTrigger asChild>

                                    <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
                                        Create Space
                                    </Button>

                                </DialogTrigger>
                                <DialogContent className="bg-gray-800 text-gray-100">
                                    <DialogHeader>
                                        <DialogTitle className="text-purple-400">Create your own space</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <Input
                                            required
                                            placeholder="Enter space name"
                                            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                        />
                                        <Input
                                            required
                                            placeholder="Enter space description"
                                            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                        />
                                        <Input
                                            placeholder="Enter private key"
                                            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                        />
                                        <Link href="/space">
                                            <Button className="w-full bg-purple-600 text-white hover:bg-purple-700 mt-4">
                                                Create Space
                                            </Button>
                                        </Link>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-800 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-pink-400">Join an Existing Space</CardTitle>
                            <CardDescription className="text-gray-400">Enter a space URL to join friends</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="w-full bg-pink-600 text-white hover:bg-pink-700">
                                        Join Space
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-gray-800 text-gray-100">
                                    <DialogHeader>
                                        <DialogTitle className="text-purple-400">Join a Space</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <Input
                                            placeholder="Enter space URL"
                                            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                        />
                                        <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
                                            Join
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>

                </section>
                <section>
                    <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        Recommended Spaces
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {recommendedSpaces.map((space) => (
                            <Card key={space.id} className="bg-gray-800 border-gray-700">
                                <CardHeader>
                                    <CardTitle className="text-blue-400">{space.name}</CardTitle>
                                    <CardDescription className="text-gray-400">{space.genre}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">
                                            <Users className="inline mr-2 h-4 w-4" />
                                            {space.members} members
                                        </span>
                                        <Link href="/space">
                                            <Button className="bg-blue-600 text-white hover:bg-blue-700">
                                                Join
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800">
                <p className="text-xs text-gray-400">© 2024 MusicSpace. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-xs hover:text-purple-400 transition-colors" href="#">
                        Terms of Service
                    </Link>
                    <Link className="text-xs hover:text-purple-400 transition-colors" href="#">
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    )
}