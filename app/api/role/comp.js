import { NextApiRequest, NextApiResponse } from 'next';
import { clerkClient } from "@clerk/nextjs"; // Assuming you need Clerk integration

export default async function MyServerComponent(req, res) {
  if (req.method === 'POST') {
    try {
      const { userId, role } = await req.body.json();

      // Perform any necessary actions like saving the role to a database
      // ... (optional)

      // Update Clerk user's metadata with the role (if applicable)
      await clerkClient.users.updateUserMetadata(userId, {
        publicMetadata: {
          role,
        },
      });

      res.status(200).json({ message: 'Role created successfully' });
    } catch (error) {
      console.error('Error creating role:', error);
      res.status(500).json({ message: 'Error' });
    }
  } else {
    // Handle other HTTP methods (optional)
    res.status(405).json({ message: 'Method not allowed' });
  }
}
