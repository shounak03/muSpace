

// import { useState } from 'react'
// import { useSession, signOut, signIn } from 'next-auth/react'
// import Link from 'next/link'
// import Image from 'next/image'

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'

// export default function Appbar() {
//   const { data: session } = useSession()
//   const [isProfileOpen, setIsProfileOpen] = useState(false)

//   return (
//     <nav className="bg-gray-900 border-b border-gray-800 px-4 py-3">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link href="/" className="flex items-center space-x-2">
//           <Music className="h-6 w-6 text-purple-500" />
//           <span className="text-2xl font-bold text-purple-500">muSpace</span>
//         </Link>

//         {session?.user ? (
//           <div className="flex items-center space-x-4">
//             <DropdownMenu open={isProfileOpen} onOpenChange={setIsProfileOpen}>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="relative h-8 w-8 rounded-full">
//                   <Image
//                     src={session.user.image || '/placeholder-avatar.png'}
//                     alt="Profile"
//                     className="rounded-full"

//                     width={100}
//                     height={40}
//                   />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-56 bg-gray-800 text-gray-100 border border-gray-700" align="end" forceMount>
//                 <DropdownMenuItem className="focus:bg-gray-700 focus:text-gray-100">
//                   <div className="flex flex-col space-y-1">
//                     <p className="font-medium">{session.user.name}</p>
//                     <p className="text-xs text-gray-400">{session.user.email}</p>
//                   </div>
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator className="bg-gray-700" />
//                 <DropdownMenuItem className="focus:bg-gray-700 focus:text-gray-100">
//                   <Settings className="mr-2 h-4 w-4" />
//                   <span>Settings</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem 
//                   className="focus:bg-gray-700 focus:text-gray-100"
//                   onSelect={(event) => {
//                     event.preventDefault()
//                     signOut()
//                   }}
//                 >
//                   <LogOut className="mr-2 h-4 w-4" />
//                   <span>Log out</span>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         ) : (
//   <div className="space-x-4">
//     <Link href="/about" className="text-purple-400 hover:text-purple-400 transition-colors">
//       About
//     </Link>

//       <Button variant="outline" className="text-purple-400 bg-black border-purple-400 hover:bg-purple-400 hover:text-gray-900"
//                 onClick={() => signIn()} >
//         Sign In
//       </Button>

//   </div>
//         )}
//       </div>
//     </nav>
//   )
// }


import { Music } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LoginButton } from './auth/login-button'
import { LogoutButton } from './auth/logout-button'
import { auth } from '@/auth'

export default async function Appbar() {
  const session = await auth()

  return (
    <nav className="px-4 lg:px-6 h-14 flex items-center justify-between bg-gray-900">
      <div className="container mx-auto flex justify-between items-center border-b border-gray-800 mb-4">
        <Link className="flex items-center justify-center" href="#">
          <Music className="h-6 w-6 text-purple-500" />
          <span className="ml-2 text-2xl font-bold text-purple-500">MusicSpace</span>
        </Link>
        <div className="space-x-4">
          {!session?.user && (
            <>
              <Link href="/about" className="text-white hover:text-purple-400 transition-colors">
                About
              </Link>
              <LoginButton>
                <Button 
                  variant="outline" 
                  className="text-white bg-black border-purple-400 hover:bg-purple-400 hover:text-gray-900"
                  size="sm"
                >
                  Sign In
                </Button>
              </LoginButton>
            </>
          )}
          {session?.user && (
            <LogoutButton>
              <Button 
                variant="outline" 
                className="text-white bg-black border-purple-400 hover:bg-purple-400 hover:text-gray-900"
                size="sm"
              >
                Logout
              </Button>
            </LogoutButton>
          )}
        </div>
      </div>
    </nav>
  )
}