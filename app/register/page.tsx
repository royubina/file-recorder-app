import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import RegisterForm from '../components/RegisterForm'

const RegisterPage = async () => {
  const session = await getServerSession();
  if(session) {
      redirect("/file-record")
  }

  return (
    <RegisterForm />
  )
}

export default RegisterPage