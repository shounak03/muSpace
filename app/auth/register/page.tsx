'use client'
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from 'next/link';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { FcGoogle } from "react-icons/fc"
import { RegisterSchema } from '@/schema';



const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      console.log(email,name,password);
      console.log(typeof(name));
      
      
      const validatedData = RegisterSchema.parse({ email, password, name });

      console.log(validatedData);
      
      const response = await fetch('/api/auth/register', {
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
        setSuccess('Registered successfully!');
      }


    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        console.log(error);
        
      } else {
        setError('An unknown error occurred');
      }
      setSuccess(undefined);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader className="text-2xl font-bold text-center">Register</CardHeader>
      <form onSubmit={handleSignIn}>
        <CardContent className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <Input
            type="username"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full">Register</Button>
        </CardContent>
      </form>
      <CardFooter className="flex flex-col space-y-4">
        <Separator />
        <div className="flex items-center w-full gap-x-2">
          <Button size="lg" className="w-full" variant={"outline"}>
            <FcGoogle className="h-5 w-5" />
          </Button >
          
        </div>
        <div className="text-center text-sm">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>

      </CardFooter>
    </Card>
  );
};

export default RegisterForm;