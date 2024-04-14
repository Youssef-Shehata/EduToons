// Assuming API route is accessible on server-side
"use client"

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

  const handleCreateRole = async (role, userName) => {
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      await createRole(userId, role);

      // Handle successful creation (e.g., redirect, show success message)
      console.log('Role created successfully!');

    } catch (error) {
      setError(error.message); // Store error message for display
    } finally {

      setLoading(false); // Clear loading state
      if (role == 'teacher') {
        router.push(`/user/${userId}`)


      } else {
        router.push(`/user/${userId}`)

      }
    }
  };

  return (
    <>
      <div>Please choose a role:</div>
      <div>
        <Button onClick={() => handleCreateRole("teacher")} loading={loading} disabled={loading}>
          Teacher
        </Button>
        <Button onClick={() => handleCreateRole("student")} loading={loading} disabled={loading}>
          Student
        </Button>
      </div>
      {error && <div className="error">{error}</div>} {/* Display error if any */}
    </>
  );
}
