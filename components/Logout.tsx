import React from 'react'
import { Button } from './ui/button'

import { logout } from '@/app/action'

function Logout() {
    return (
        <form action={async()=>{
            
            await logout()
          }}>
            <Button variant="outline" className="border-light-purple text-light-purple hover:bg-light-purple/20"
            type='submit'>
                Logout
            </Button>
        </form>
    )
}

export default Logout