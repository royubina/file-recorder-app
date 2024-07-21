'use client'

import { signOut } from "next-auth/react"

const Logout = () => {
  return (
    <div>
      <button className="text-sm font-bold gap-2 cursor-pointer" onClick={() => signOut()}>
          Log out
      </button>
    </div> 
  )
}

export default Logout