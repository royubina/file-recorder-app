import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginForm from "../components/LoginForm";

const LoginPage = async () => {
    const session = await getServerSession();

    if(session) {
        redirect("/file-record")
    }

    return (
        <LoginForm />
    )
}

export default LoginPage