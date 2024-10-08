import React from 'react'
import {auth, signOut} from '@/auth'
import { json } from 'stream/consumers';

export default async function page() {

  const session = await auth();
  return (
    <div>{JSON.stringify(session)}
    <form action={async() =>{
      'use server'
      await signOut()
    }}>
      <button type='submit'>
        SignOut
      </button>
    </form>
    </div>
  )
}
