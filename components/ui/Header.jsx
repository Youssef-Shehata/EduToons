'use client'
import React from 'react';
import Link from 'next/link';
const Header = () => {
  return (
    <header className="flex justify-between w-full absolute text-white z-50 py-10 px-32   ">
      <Link href='/' className="text-6xl font-bold gluten-custom ">EduToons</Link>
      <div className="flex justify-between items-center">
      </div>
    </header>
  );
};

export default Header;
