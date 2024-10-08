
import * as z from 'zod'

export const LoginSchema = z.object({
    email:z.string().email({message:'email is required'}),
    password:z.string().min(1,{message:'Password is required'}),
})

export const RegisterSchema = z.object({
    email:z.string().email({message:'email is required'}),
    password:z.string().min(1,{message:'Minimum 6 characters is required'}),
    // Avatar:z.string(),
    fullname:z.string().min(6,{message:'name is required'}),
})


export const spaceSchema = z.object({
    name: z.string(),
    description: z.string(),
    privateKey: z.string()
})