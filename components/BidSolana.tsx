"use client"
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import Image from 'next/image'
import { toast } from 'sonner';

export default function BidSolana({ songId, amount }: { songId: string, amount: number }) {


  const { publicKey, wallet,sendTransaction } = useWallet()
  const connection = new Connection('https://api.devnet.solana.com');
  const GOVERNANCE_ADDRESS = new PublicKey('BdZMeRCC7zrXuZBj5XpPJFjqcWHKR62kPrgGk551mcNM');




  async function bidSol() {
    if (!wallet || !publicKey) {
      return toast.error("Please connect your wallet");
    }
  
    try {

      
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: GOVERNANCE_ADDRESS,
          lamports: 0.01*LAMPORTS_PER_SOL
        }),
      );
  
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;
  
      const signature = await sendTransaction(transaction, connection); 
  
      const status = await connection.getSignatureStatus(signature);
      console.log(status);
      

      if(status?.value?.err)
      {
          throw new Error;
      }
      toast.success('Transaction sent successfully!');
      
      await submit()
      // console.log('Transaction successful with signature:', signature);
    } catch (error) {
      console.error('Transaction failed:', error);
      toast.error('Transaction failed');
    } 
  }

  async function submit() {
    console.log(songId);
    console.log(amount);


    const res = await fetch(`/api/solana`, {
      method: "POST",
      headers: { 'content-type': "application/json" },
      body: JSON.stringify({ songId, amount })
    })
    const data = await res.json()
    if (!res.ok) {
      console.log(data);

    }
    
    
    console.log(data);

  }


  async function getBid(){
    const res = await fetch(`/api/solana?songId=cm9zeads1000hytj86fc6a4me`)
    const data = await res.json()
    console.log(data);
    
  }




  return (
    // <Image src={'/solana.png'} alt={"bid"} width={35} height={35} className='ml-8 mr-6 cursor-pointer' onClick={bidSol} />
    <div className="relative group ml-8 mr-6 cursor-pointer" onClick={submit}>
      <Image
        src="/solana.png"
        alt="bid"
        width={35}
        height={35}
        className="w-[35px] h-[35px]"
      />

      {/* Text appears on hover */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition text-sm text-white bg-black px-2 py-1 rounded">
        Bid {amount} solana
      </div>
    </div>
  )
}
