
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from 'next/link';

import { LoginForm } from '@/components/login-form';
import GoogleAuth from '@/components/google-login';


const Page = () => {
 
  return (
    <Card className="w-[350px]">
      
      <CardHeader className="text-2xl font-bold text-center">Login</CardHeader>

      <LoginForm/>

      <CardFooter className="flex flex-col space-y-4">
        <Separator />
        <GoogleAuth/>
        
        <div className="text-center  cursor-pointer text-lg">
        Don't have an account?{' '}
          <Link href="/auth/register" className="text-blue-500 hover:underline cursor-pointer ">
            Register
          </Link>
        </div>
      </CardFooter>

    </Card>
  );
};

export default Page;