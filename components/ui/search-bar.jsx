"use client";
import { Input } from "@/components/ui/input"
import { useState } from "react";

export default function SearchBar({ updateVids }) {
  const [query, setQuery] = useState('')


  return (
    <Input className="  rounded-full w-36 h-9 border-1 bg-white text-gray-950 pl-4 cursor-pointer hover:w-44 focus:w-44 ease-in-out duration-300		"
      value={query}
      onChange={(e) => {
        setQuery(e.target.value)
        updateVids(e.target.value)
      }}
      placeholder="Search..." />

  )
}