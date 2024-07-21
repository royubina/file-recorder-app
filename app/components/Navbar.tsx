import { getServerSession } from 'next-auth'
import Logout from './Logout';
import Link from 'next/link';
import { IoFileTrayFullSharp } from "react-icons/io5";

const Navbar = async () => {
    const session = await getServerSession();

    return (
        <div className="mx-3 my-2 px-3 pb-3 border-b-4 mb-2">
            <nav className="flex justify-between">
                <div className="flex flex-row space-x-5">
                    <Link href="/"><IoFileTrayFullSharp color="#42A5F5" size="1.5em" /></Link>
                    {!!session && 
                        <Link className="text-sm font-bold gap-2 cursor-pointer bg-blue-400 hover:bg-blue-600 rounded-3xl px-3 py-1" href="/file-record">File Record</Link>
                    }
                </div>
                {!!session && 
                    <Logout />
                }
                {!session && 
                    <div className="space-x-2">
                        <Link className="text-sm font-bold gap-2 cursor-pointer" href="/login">Log in</Link>
                        <Link className="text-sm font-bold gap-2 cursor-pointer bg-blue-400 hover:bg-blue-600 rounded-3xl px-3 py-1" href="/register">Register</Link>
                    </div>
                }
            </nav>
        </div>
    )
}

export default Navbar