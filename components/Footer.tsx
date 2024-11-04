
import Link from 'next/link'


export default function Footer() {
  return (



    <footer className="border-t mt-8 py-4 bg-gray-900">
           <div className="container mx-auto flex justify-between items-center">
          <p className="text-xs text-gray-400">© 2024 MusicSpace. All rights reserved.</p>
          <div className="flex space-x-4">
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
          </div>
        </div>
      </footer>

  )
}


// import React from 'react';

// const Footer = () => {
//   return (
//     <footer className="border-t mt-8 py-4 bg-gray-100">
//       <div className="container mx-auto flex justify-between items-center">
//         <p className="text-sm text-gray-600">
//           © 2024 MusicSpace. All rights reserved.
//         </p>
//         <div className="flex space-x-4">
//           <a href="/terms" className="text-sm text-gray-600 hover:text-gray-800">
//             Terms of Service
//           </a>
//           <a href="/privacy" className="text-sm text-gray-600 hover:text-gray-800">
//             Privacy
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
