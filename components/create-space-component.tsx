// 'use client'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { DialogHeader } from "@/components/ui/dialog";
// import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
// import { Input } from "@/components/ui/input";
// import { useState } from "react";
// import { Button } from "./ui/button";

// export const CreateSpace = () => {

//     // const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false)
//     const [isNewSpaceDialogOpen, setIsNewSpaceDialogOpen] = useState(false)
//     return (
//         <Card className="bg-gray-800 border-gray-700">
//             <CardHeader>
//                 <CardTitle className="text-purple-400">Create a New Space</CardTitle>
//                 <CardDescription className="text-gray-400">Start your own music listening room</CardDescription>
//             </CardHeader>
//             <CardContent>
//                 <Dialog open={isNewSpaceDialogOpen} onOpenChange={setIsNewSpaceDialogOpen}>
//                     <DialogTrigger asChild>

//                         <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
//                             Create Space
//                         </Button>

//                     </DialogTrigger>
//                     <DialogContent className="bg-gray-800 text-gray-100">
//                         <DialogHeader>
//                             <DialogTitle className="text-purple-400">Create your own space</DialogTitle>
//                         </DialogHeader>
//                         <div className="space-y-4">
//                             <Input
//                                 required
//                                 name="name"
//                                 placeholder="Enter space name"
//                                 className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"

//                             />
//                             <Input
//                                 required
//                                 name="description"
//                                 placeholder="Enter space description"
//                                 className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"

//                             />
//                             <Input
//                                 name="privateKey"
//                                 placeholder="Enter private key"
//                                 className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"

//                             />
//                             <Button
//                                 className="w-full bg-purple-600 text-white hover:bg-purple-700 mt-4"

//                             >
//                                 Create Space
//                             </Button>
//                         </div>
//                     </DialogContent>
//                 </Dialog>
//             </CardContent>
//         </Card>
//     )
// } 

'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "./ui/button";

export const CreateSpace = () => {
    const [isNewSpaceDialogOpen, setIsNewSpaceDialogOpen] = useState(false)

    return (
        <>
            <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                    <CardTitle className="text-purple-400">Create a New Space</CardTitle>
                    <CardDescription className="text-gray-400">Start your own music listening room</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button 
                        className="w-full bg-purple-600 text-white hover:bg-purple-700"
                        onClick={() => setIsNewSpaceDialogOpen(true)}
                    >
                        Create Space
                    </Button>
                </CardContent>
            </Card>

            <Dialog open={isNewSpaceDialogOpen} onOpenChange={setIsNewSpaceDialogOpen}>
                <DialogContent className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-gray-800 text-gray-100 p-6 rounded-lg w-full max-w-md border border-purple-500 shadow-lg">
                        <DialogHeader>
                            <DialogTitle className="text-purple-400">Create your own space</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                            <Input
                                required
                                name="name"
                                placeholder="Enter space name"
                                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            />
                            <Input
                                required
                                name="description"
                                placeholder="Enter space description"
                                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            />
                            <Input
                                name="privateKey"
                                placeholder="Enter private key"
                                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            />
                            <Button
                                className="w-full bg-purple-600 text-white hover:bg-purple-700 mt-4"
                            >
                                Create Space
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}