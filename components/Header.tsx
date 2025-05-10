// components/RouteAwareHeader.tsx
'use client'
import { usePathname } from 'next/navigation'
import { Appbar } from "./Appbar"
import FloatingNavbar from "./FloatingNavbar"

export default function RouteAwareHeader() {
  const pathname = usePathname()
  const isSpaceDetailPage = pathname?.startsWith('/spaces/')
  
  return isSpaceDetailPage ? <FloatingNavbar /> : <Appbar />
}