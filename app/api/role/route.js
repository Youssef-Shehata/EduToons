import { NextResponse } from 'next/server';
import { clerkClient } from "@clerk/nextjs";
export async function POST(req) {
  const { userId, role } = await req.json()
  console.log(userId)
  try {
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        "role": role,
      },
    });

    // Send a successful response
    return new Response(JSON.stringify({ message: 'Role created successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating role:', error);
    // Handle errors gracefully (e.g., return an error response)
    return new Response(JSON.stringify({ message: 'Error creating role' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function GET() {

  return NextResponse.json({ "msg": "zeby" })
}










// export default async function handler(req) {
//   if (req.method === 'POST') {
//     try {
//       // Extract the userId and role from the request body
//       const { userId, role } = await req.body.json();
//       console.log("role")
//       // Perform the necessary logic to create the role (optional)
//       // ... (e.g., save to a database if needed)

//       // Update Clerk user's metadata with the role
//       await clerkClient.users.updateUserMetadata(userId, {
//         publicMetadata: {
//           "role": role,
//         },
//       });

//       // Send a successful response
//       return new Response(JSON.stringify({ message: 'Role created successfully' }), {
//         status: 200,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//     } catch (error) {
//       console.error('Error creating role:', error);
//       // Handle errors gracefully (e.g., return an error response)
//       return new Response(JSON.stringify({ message: 'Error creating role' }), {
//         status: 500,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//     }
//   } else {
//     // Handle other HTTP methods (optional)
//     return new Response(null, {
//       status: 405, // Allow only POST method
//       headers: {
//         'Allow': 'POST',
//       },
//     });
//   }
// }
