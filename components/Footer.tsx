
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
   
    <div className="bg-gray-900 border-b border-gray-800 px-4 py-3">

    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center justify-between px-6 md:px-6 ">

    <div className="container mx-auto flex justify-between items-center border-t border-gray-800">
      <p className="text-xs text-gray-400">© 2024 MusicSpace. All rights reserved.</p>
      <nav className="flex gap-4 sm:gap-6">
        <Link
          className="text-xs  text-gray-400 hover:text-purple-400 transition-colors"
          href="/terms-of-service"
          aria-label="Terms of Service"
          >
          Terms of Service
        </Link>
        <Link
          className="text-xs text-gray-400 hover:text-purple-400 transition-colors"
          href="/privacy-policy"
          aria-label="Privacy Policy"
          >
          Privacy
        </Link>
      </nav>
      </div>
    </footer>
          </div>
  )
}


