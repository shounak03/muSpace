'use client'

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import '@solana/wallet-adapter-react-ui/styles.css'

const WalletIcon = () => {
  return (
    <WalletMultiButton
      style={{
        backgroundColor: 'black',
        color: 'white',
        border: '1px solid #a855f7', // Tailwind's border-purple-400
        padding: '0.25rem 0.75rem',  // Tailwind size="sm" => py-1 px-3
        fontSize: '0.875rem',        // text-sm
        borderRadius: '0.375rem',    // rounded-md
        transition: 'all 0.2s ease-in-out',
        cursor: 'pointer',
        height:'33px'
      }}
      // onMouseEnter={(e:MouseEvent) => {
      //   e.currentTarget.style.backgroundColor = '#a855f7'; // hover:bg-purple-400
      //   e.currentTarget.style.color = '#111827'; // hover:text-gray-900
      // }}
      // onMouseLeave={(e) => {
      //   e.currentTarget.style.backgroundColor = 'black';
      //   e.currentTarget.style.color = 'white';
      // }}
    />
  )
}

export default WalletIcon
