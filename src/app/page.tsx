import { auth } from "@/auth"
import InkerProfile from "@/components/InkerProfile"
import LoginPage from "./login/page";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    return <InkerProfile />
  }

  return (
    <LoginPage />
  )
}
