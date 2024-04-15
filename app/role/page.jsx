// Assuming API route is accessible on server-side
"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'

function Choice({ role, description, handler }) {
  return (
    <Card className={`w-96 cursor-pointer hover:border-white transition-all hover:w-[400px]  hover:text-red`} onClick={() => handler(role.toLowerCase())}>
      <CardHeader>
        <CardTitle className={`flex justify-center  pb-2 `}>{role}</CardTitle>
        <CardDescription className='flex  justify-center break-words word-wrap:break-word  h-16 '>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className='mt-9 flex justify-center items-end  h-72'>
        <Image
          src={`/${role.toLowerCase()}.jpeg`}
          width={400}
          height={400}
          alt="Picture of the author"
        />
        {/* <Button className="" onClick={() => handler("teacher")} loading={loading} disabled={loading}>
          {role}
        </Button> */}
      </CardContent>

    </Card>
  )
}
export async function createRole(userId, role) {

  try {
    const response = await fetch('http://localhost:3000/api/role', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, role }),
    });

    const data = await response.json();
    console.log("data ", data)

  } catch (error) {
    console.error('Error creating role:', error);
  }

  return data
}

import { useAuth, useUser } from "@clerk/nextjs";
import { useState } from 'react'; // Import useState for feedback
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Role() {
  const router = useRouter()
  const { user } = useUser()
  console.log(user)
  const { userId } = useAuth();
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track errors

  const handleCreateRole = async (role) => {
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      await createRole(userId, role);

      // Handle successful creation (e.g., redirect, show success message)
      console.log('Role created successfully!');
      // 501x273

    } catch (error) {
      setError(error.message); // Store error message for display
    } finally {

      setLoading(false); // Clear loading state
      router.push(`/user/${userId}`)

    }
  };
  const teacherDes = " Share your knowledge by uploading videos of yourself doing what you do best to students all over the world."
  const studentDes = "Explore the most entertaining videos from the best teachers all over the worlds in multiple languages ,and monologued by your favourite cartoon character"
  return (
    <div className="p-8 mt-11 flex flex-col gap-3 justify-center items-center">
      <div className="flex p-3 text-5xl text-green-500 lemonada font-bold  ">Please choose a role:</div>
      <div className="flex items-center gap-5">






        <Choice role='Teacher' description={teacherDes} handler={handleCreateRole} loading={loading} />
        <Choice role='Student' description={studentDes} handler={handleCreateRole} loading={loading} />



      </div>
      <div className="p-3 text-gray-500 ">this choice cant be changed later , so choose wisely.</div>
      {error && <div className="p-3 bg-redish rounded-sm">{error}</div>} {/* Display error if any */}
    </div >
  );
}
