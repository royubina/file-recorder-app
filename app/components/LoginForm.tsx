'use client'

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const LoginForm = () => {
    const router = useRouter();

    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const response = await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false
        });

        if(!response?.error) {
            router.push("/file-record");
            router.refresh();
        } else {
            setError("Either username or password is incorrect")

            return
        }
    }

    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-400">
                <h1 className="text-xl font-bold my-4">Log in</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input name="email" type="email" placeholder="Email" />
                    <input name="password" type="password" placeholder="Password" />
                    <button className="bg-blue-400 hover:bg-blue-600 cursor-pointer text-white font-bold rounded-md" type="submit">Log in</button> 

                    { error &&
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{error}</div>
                    }

                    <Link className="text-sm mt-3 text-right" href={'/register'}>
                        Do not have an account? <span className="underline">Register</span>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default LoginForm