// components/RouteAwareHeader.tsx
'use server'
import { headers } from "next/headers";
import FloatingNavbar from "./FloatingNavbar";
import { SpaceHeader } from "./space-header";

async function RouteAwareHeader() {
  const headerList = headers();
  
  const pathname = headerList.get("x-current-path");
  console.log("pathname", pathname);
  const isSpaceDetailPage = pathname?.startsWith('/spaces/');

  if (isSpaceDetailPage) {
    return null;
  }

  return <FloatingNavbar />;
}

export default RouteAwareHeader;