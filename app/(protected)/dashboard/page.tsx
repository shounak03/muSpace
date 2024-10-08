

// 'use client'

// import { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import Link from "next/link"
// import { Appbar } from '@/components/Appbar'
// import { z } from 'zod'
// import { spaceSchema } from '@/schema'
// import { useRouter } from 'next/router'

// export default function Dashboard() {

//     const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false)
//     const [isNewSpaceDialogOpen, setIsNewSpaceDialogOpen] = useState(false)

//     // const recommendedSpaces = [
//     //     { id: 1, name: "Chill Vibes", members: 42, genre: "Lo-fi" },
//     //     { id: 2, name: "Rock Legends", members: 78, genre: "Classic Rock" },
//     //     { id: 3, name: "EDM Party", members: 103, genre: "Electronic" },
//     // ]


//     const onclick =  async (values: z.infer<typeof spaceSchema>) => {
//         // const router = useRouter();
//         try {
//             const response = await fetch('/api/space/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(values),
//             });

//             const data = await response.json();

//             if (data.success) {
//                 // Close the dialog
//                 setIsNewSpaceDialogOpen(false);
//                 // Redirect to the new space page
//                 // router.push('/space');
//             } else {
//                 console.error('Error creating space:', data.error);
//                 // Handle error (e.g., show an error message to the user)
//             }
//         } catch (error) {

//         }
//     }

'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Appbar } from '@/components/Appbar'
import { z } from 'zod'
import { spaceSchema } from '@/schema'
import { useRouter } from 'next/router'

export default function Dashboard() {
    // const router = useRouter();
    const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false)
    const [isNewSpaceDialogOpen, setIsNewSpaceDialogOpen] = useState(false)
    
    const [newSpaceValues, setNewSpaceValues] = useState({
        name: '',
        description: '',
        privateKey: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewSpaceValues(prev => ({ ...prev, [name]: value }));
    }

    const handleCreateSpace = async () => {
        try {
            const validatedValues = spaceSchema.parse(newSpaceValues);
            const response = await fetch('/api/space/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(validatedValues),
            });

            const data = await response.json();

            if (data.success) {
                setIsNewSpaceDialogOpen(false);
                // router.push('/space');
            } else {
                console.error('Error creating space:', data.error);
                // Handle error (e.g., show an error message to the user)
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.error('Validation error:', error.errors);
                // Handle validation error (e.g., show error messages to the user)
            } else {
                console.error('Unexpected error:', error);
            }
        }
    }
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
                                            name="name"
                                            placeholder="Enter space name"
                                            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                            value={newSpaceValues.name}
                                            onChange={handleInputChange}
                                        />
                                        <Input
                                            required
                                            name="description"
                                            placeholder="Enter space description"
                                            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                            value={newSpaceValues.description}
                                            onChange={handleInputChange}
                                        />
                                        <Input
                                            name="privateKey"
                                            placeholder="Enter private key"
                                            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                            value={newSpaceValues.privateKey}
                                            onChange={handleInputChange}
                                        />
                                        <Button
                                            className="w-full bg-purple-600 text-white hover:bg-purple-700 mt-4"
                                            onClick={handleCreateSpace}
                                        >
                                            Create Space
                                        </Button>
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

