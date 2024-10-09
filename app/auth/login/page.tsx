// 'use client'
// import React, { useState } from 'react';
// import { signIn } from '@/auth';
// import { z } from 'zod';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import Link from 'next/link';
// import { FormError } from '@/components/form-error';
// import { FormSuccess } from '@/components/form-success';
// import {FcGoogle} from "react-icons/fc"
// import {FaGithub} from "react-icons/fa"
// import { LoginSchema } from '@/schema';
// import { CredentialsSignin } from 'next-auth';



// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState<string | undefined >("");
//   const [success, setSuccess] = useState<string | undefined>("");

//   const handleSignIn = async (e:any) => {
    
//     e.preventDefault();
//     setError('');
//     setSuccess('');

    
//     try {
//       const validatedData = LoginSchema.parse({ email, password });
      
//       await signIn('credentials', {
//         email: validatedData.email,
//         password: validatedData.password,
//         redirect: true,
//         redirectTo: '/',
//       });

      
//         setSuccess('Signed in successfully');
//         setError(undefined)
  
//     } catch (error:any) {
//       // const err = error as string;
//       console.log(error);
      
//       setError(error.message);
//       setSuccess(undefined)
//     }
//   };

//   return (
//     <Card className="w-[350px]">
//       <CardHeader className="text-2xl font-bold text-center">Login</CardHeader>
//       <form onSubmit={handleSignIn}>
//         <CardContent className="space-y-4">
//           <Input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <Input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <FormError message={error} />
//           <FormSuccess message={success} />
//           <Button type="submit" className="w-full">Sign In</Button>
//         </CardContent>
//       </form>
//       <CardFooter className="flex flex-col space-y-4">
//         <Separator />
//         <div className="flex items-center w-full gap-x-2">
//         <Button size="lg" className="w-full" variant={"outline"}>
//             <FcGoogle className="h-5 w-5" />
//         </Button >
//         <Button size="lg" className="w-full" variant={"outline"}>
//             <FaGithub className="h-5 w-5" />
//         </Button>
//       </div>
//       <div className="text-center text-sm">
//           Don't have an account?{' '}
//           <Link href="/auth/register" className="text-blue-500 hover:underline">
//             Register
//           </Link>
//         </div> 

//       </CardFooter>
//     </Card>
//   );
// };

// export default LoginForm;


import React, { useState } from 'react';
import { signIn } from '@/auth';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from 'next/link';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { LoginSchema } from '@/schema';
import { LoginForm } from '@/components/login-form';

const Page = () => {
 
  return (
    <Card className="w-[350px]">
      <CardHeader className="text-2xl font-bold text-center">Login</CardHeader>
      <LoginForm/>
      <CardFooter className="flex flex-col space-y-4">
        <Separator />
        <div className="flex items-center w-full gap-x-2">
          <Button size="lg" className="w-full" variant={"outline"}>
            <FcGoogle className="h-5 w-5" />
          </Button>
          <Button size="lg" className="w-full" variant={"outline"}>
            <FaGithub className="h-5 w-5" />
          </Button>
        </div>
        <div className="text-center text-sm">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Page;