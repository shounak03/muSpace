import { auth } from "./auth"
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes
} from "@/routes"
import { NextResponse } from "next/server"


const checkSpace = async()=>{
  const resp = await fetch('api/getSpaceId')
  const data = await resp.json();
  if(resp.ok){
      if(data.spaceId){
          return data.spaceId;
      }
  }
}
export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return NextResponse.next()
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      const spaceId =  checkSpace();
      if(spaceId)
          return NextResponse.redirect(new URL(`/spaces/${spaceId}`, nextUrl))
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return NextResponse.next()
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}