"use client"
import { CardWrapper } from "./card-wrapper"
import { useForm } from 'react-hook-form'
import { useTransition } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import * as z from "zod"
import { RegisterSchema } from "@/schema";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import { useState } from "react";

export const RegisterForm = () => {

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            fullname: ""
        }
    });

    const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {

       setError("")
       setSuccess("")
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            setSuccess('Registration successful!');
            setError(undefined);
            // Optionally, redirect the user or clear the form
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
            setSuccess(undefined);
        }
    }

    return (


        <CardWrapper
            headerLabel="Create an Account"
            backButtonLabel="Already have an account?"
            backButtonHref="/auth/login"
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField control={form.control} name="fullname" render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Fullname
                            </FormLabel>
                            <FormControl>


                                <Input
                                    {...field}
                                    disabled={isPending}
                                    placeholder="enter your password"
                                    type="fullname"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <div className="space-y-4">
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Email
                                </FormLabel>
                                <FormControl>


                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="enter your email"
                                        type="email"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Password
                                </FormLabel>
                                <FormControl>


                                    <Input
                                        {...field}
                                        placeholder="enter your password"
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />


                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button typeof="submit" className="w-full" disabled={isPending}>
                        Register
                    </Button>
                </form>
            </Form>
        </CardWrapper>

    );
};