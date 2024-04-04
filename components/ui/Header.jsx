'use client'
import { SignInButton, SignOutButton, SignUpButton, SignedIn, SignedOut, UserButton, useSession } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"
import React from 'react';
import Link from 'next/link';

const Header = () => {
  const session = useSession();

  return (
    <header className="bg-blue-900 text-white py-4 flex items-center">
      <div className="container mx-auto px-4 flex justify-between">
        <Link href="/" className="text-2xl font-bold">EduToons

        </Link>
        <div className="flex justify-between">
          <SignedOut>
            <SignInButton className="px-5" mode="modal" />
            <SignUpButton className="px-5" mode="modal" redirectUrl="/role" />
          </SignedOut>
          {/* <SignedIn>

            <SignOutButton className="px-5" mode="modal" />
          </SignedIn> */}

          <UserButton></UserButton>
        </div>

      </div>
    </header>
  );
};

export default Header;
