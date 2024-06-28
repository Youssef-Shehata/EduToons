"use client";
import Header from "@/components/ui/Header";
import TransitioningBackground from "@/components/ui/transition-background";
import WelcomePage from "@/components/ui/welcome-page";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser()
  console.log(user)
  return (
    <div className="relative h-screen ">

      <TransitioningBackground >
        <WelcomePage user={user} />
      </TransitioningBackground>

    </div >
  );
}
