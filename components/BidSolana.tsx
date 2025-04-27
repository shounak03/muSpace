"use client"
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import Image from 'next/image'
import React from 'react'
import { toast } from 'sonner';

export default function BidSolana({ songId, amount }: { songId: string, amount: number }) {

  // const {Connection} = useConnection()
  const { publicKey, wallet } = useWallet()
  const connection = new Connection('https://api.devnet.solana.com');
  const GOVERNANCE_ADDRESS = new PublicKey('BdZMeRCC7zrXuZBj5XpPJFjqcWHKR62kPrgGk551mcNM');



  async function bidSol() {
    console.log(publicKey);

    if (!wallet) {
      return toast.error("Please connect your wallet");
    }


    if (!publicKey) {
      return toast.error("Wallet has no public key");
    }

    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: GOVERNANCE_ADDRESS,
          lamports: 0.001 * LAMPORTS_PER_SOL,
        }),
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      const signedTransaction = await wallet?.adapter?.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signedTransaction.serialize());

      const status = await connection.getSignatureStatus(signature);
      if (!signature) {
        return toast.error('Transaction failed');
      }
      if (status.value?.err) {

        console.log(status.value.err);
        return toast.error('Transaction failed');
      }


      toast.success('Transaction sent successfully!');
      console.log('Transaction successful with signature:', signature);

    } catch (error) {
      console.error('Transaction failed:', error);
      toast.error('Transaction failed');
    } finally {
      submit()
    }
  }

  async function submit() {
    console.log(songId);


    const res = await fetch(`/api/checkSol`, {
      method: "POST",
      headers: { 'content-type': "application/json" },
      body: JSON.stringify({ songId, amount })
    })

    const data = await res.json()
    if (!res.ok) {
      console.log();

    }
    console.log(data);

  }





  return (
    // <Image src={'/solana.png'} alt={"bid"} width={35} height={35} className='ml-8 mr-6 cursor-pointer' onClick={bidSol} />
    <div className="relative group ml-8 mr-6 cursor-pointer" onClick={bidSol}>
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
