'use client'

import Link from 'next/link'
import React, { FormEvent, useState } from 'react'
import { FaRegCheckCircle } from 'react-icons/fa';
import bcrypt from 'bcryptjs';

const RegisterForm = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const timer = setTimeout(() => { setMessage(""); }, 10000);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget)

    const emailResult = await fetch(`http://localhost:8001/api/account/search?value=${formData.get('username')}&page=${1}&perPage=${1}`)
    const emailData = await emailResult.json()

    if(emailData.body.total !== 0) {
      setError("Email already exists")
      
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const body = {
      "fullname": fullname,
      "username": username,
      "password": hashedPassword
    }
    const result = await fetch(`http://localhost:8001/api/account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

    const data = await result.json()

    setFullname("");
    setUsername("");
    setPassword("");
    setMessage(data.message)
  }

  return (
    <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-400">
            <h1 className="text-xl font-bold my-4">Registration</h1>

            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <input type="text" name="fullname" placeholder="Name" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                <input type="text" name="username" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" name="password" placeholder="Password" value={password}  onChange={(e) => setPassword(e.target.value)} />
                <button className="bg-blue-400 hover:bg-blue-600 cursor-pointer text-white font-bold rounded-md" type="submit">Register</button> 

                { error &&
                  <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{error}</div>
                }
                
                <Link className="text-sm mt-3 text-right" href={'/login'}>
                    Already have an account? <span className="underline">Login</span>
                </Link>
            </form>
        </div>

        {/* MESSAGE MODAL */}
        { message !== "" &&
          <div className="toast toast-top toast-center font-bold">
            <div className="alert alert-success">
              <FaRegCheckCircle size={20} />
              <span>{message}</span>
            </div>
          </div>
        }
    </div>
  )
}

export default RegisterForm