
import { NextResponse } from 'next/server';
import { clerkClient } from "@clerk/nextjs";



export async function GET() {
  try {
    // const { userId, role } = await req.body.json();

    // Perform any necessary actions like saving the role to a database
    // ... (optional)

    // Update Clerk user's metadata with the role (if applicable)
    const users = await clerkClient.users.getUserList();

    // res.status(200).json({ users: users });
    return NextResponse.json({ users: users })

  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error' });
  }

  // return NextResponse.json({ "msg": "zeby" })
}

