import Image from 'next/image'
import React from 'react'

export default function BidSolana() {


    const bidSol = async () =>{
        console.log("bid sol");
    
    }
  return (
    <Image src={'/solana.png'} alt={"bid"} width={35} height={35} className='ml-8' onClick={bidSol}/>
  )
}
