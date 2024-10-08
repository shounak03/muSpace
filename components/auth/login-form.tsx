// "use client"
// import { useState } from "react";
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from "zod"
// import { CardWrapper } from "./card-wrapper"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { FormError } from "../form-error";
// import { FormSuccess } from "../form-success";
// import { LoginSchema } from "@/schema";
// import { redirect, useRouter } from 'next/navigation';
// import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

// export const LoginForm = () => {
//     const router = useRouter();
//     const [error, setError] = useState<string | undefined>("");
//     const [success, setSuccess] = useState<string | undefined>("");
//     const [isLoading, setIsLoading] = useState(false);

//     const form = useForm<z.infer<typeof LoginSchema>>({
//         resolver: zodResolver(LoginSchema),
//         defaultValues: {
//             email: "",
//             password: ""
//         }
//     });

//     const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
//         setError("");
//         setSuccess("");
//         setIsLoading(true);

//         try {
//             const response = await fetch('/api/auth/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(values),
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.error || 'Login failed');
//             }

//             setSuccess(data.success);

//         } catch (error) {
//             if (error instanceof Error) {
//                 if(error.message !== "NEXT_REDIRECT")
//                     setError(error.message);
//             } else {
//                 setError('An unknown error occurred');
//             }
//         } finally {
//             setIsLoading(false);
//             router.push(DEFAULT_LOGIN_REDIRECT);


//         }
//     }


//     return (
//         <CardWrapper
//             headerLabel="Welcome back"
//             backButtonLabel="Don't have an account"
//             backButtonHref="/auth/register"
//             showSocial
//         >
//             <Form {...form}>
//                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                     <div className="space-y-4">
//                         <FormField
//                             control={form.control}
//                             name="email"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Email</FormLabel>
//                                     <FormControl>
//                                         <Input
//                                             {...field}
//                                             placeholder="Enter your email"
//                                             type="email"
//                                             disabled={isLoading}
//                                         />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="password"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Password</FormLabel>
//                                     <FormControl>
//                                         <Input
//                                             {...field}
//                                             placeholder="Enter your password"
//                                             type="password"
//                                             disabled={isLoading}
//                                         />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                     </div>
//                     {error && <FormError message={error} />}
//                     {success && <FormSuccess message={success} />}
//                     <Button type="submit" className="w-full" disabled={isLoading}>
//                         {isLoading ? "Logging in..." : "Login"}
//                     </Button>
//                 </form>
//             </Form>
//         </CardWrapper>
//     );
// };

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from 'next/link';
import { LoginSchema } from '@/schema';



const SignInComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setErrors] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const handleSignIn = async (e: any) => {
        e.preventDefault();
        setErrors(undefined);


        try {

            const validatedData = LoginSchema.parse({ email, password });

            const result = await signIn('credentials', {
                email: validatedData.email,
                password: validatedData.password,
                redirect: false,
            });

            if (result.error) {
                setErrors({ form: result.error });
            } else {
                // Redirect or handle successful sign-in
                window.location.href = '/';
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = {};
                error.errors.forEach((err) => {
                    fieldErrors[err.path[0]] = err.message;
                });
                setErrors(fieldErrors);
            }
        }
    };

    return (
        <Card className="w-[350px]">
            <CardHeader className="text-2xl font-bold text-center">Sign In</CardHeader>
            <form onSubmit={handleSignIn}>
                <CardContent className="space-y-4">
                    <div>
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={errors.password ? "border-red-500" : ""}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    {errors.form && <p className="text-red-500 text-sm">{errors.form}</p>}
                    <Button type="submit" className="w-full">Sign In</Button>
                </CardContent>
            </form>
            <CardFooter className="flex flex-col space-y-4">
                <Separator />
                <div className="text-center text-sm text-gray-500">Or continue with</div>
                <Button onClick={() => signIn('google')} variant="outline" className="w-full">
                    Google
                </Button>
                <Button onClick={() => signIn('facebook')} variant="outline" className="w-full">
                    Facebook
                </Button>
                <div className="text-center text-sm">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-blue-500 hover:underline">
                        Register here
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
};

export default SignInComponent;