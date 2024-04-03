import { SignInButton, SignUpButton } from "@clerk/nextjs";

import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-blue-900 text-white py-4 ">
      <div className="container mx-auto px-4 flex justify-between">
        <Link href="/" className="text-2xl font-bold">EduToons

        </Link>
        <div >
          <SignInButton className="px-5" mode="modal" />
          <SignUpButton className="px-5" mode="modal" />
        </div>

      </div>
    </header>
  );
};

export default Header;
