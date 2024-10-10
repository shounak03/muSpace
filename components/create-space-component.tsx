
'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { spaceSchema } from "@/schema";

import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { useRouter } from "next/navigation";

export const CreateSpace = () => {
    const [isNewSpaceDialogOpen, setIsNewSpaceDialogOpen] = useState(false)
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const router = useRouter()
    const handleSpace = async () => {
        console.log(name, description, privateKey);
        const validatedData = spaceSchema.parse({ name, description, privateKey })
        

        try {
            const response = await fetch('/api/spaces', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(validatedData),
            });
            const data = await response.json();
            console.log(data);
    
    
            if (!response.ok) {
                throw new Error(data || 'Registration failed');
            }
            if (data?.error) {
                setError(data.error);
            } else {
                setSuccess('space created successfully!');
                router.push(data.updatedSpace.url)

    
            }
        } catch (error) {
            if (error instanceof Error) {
              setError(error.message);
            } else {
              setError('An unknown error occurred');
            }
            // setSuccess('');
        }
    }

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
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Input
                                required
                                name="description"
                                placeholder="Enter space description"
                                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <Input
                                name="privateKey"
                                placeholder="Enter private key"
                                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                value={privateKey}
                                onChange={(e) => setPrivateKey(e.target.value)}
                            />
                             <FormSuccess message={success}/>
                            <Button
                                className="w-full bg-purple-600 text-white hover:bg-purple-700 mt-4"
                                onClick={handleSpace}
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