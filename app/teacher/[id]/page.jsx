"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api"
import { useUser } from "@clerk/nextjs";

import UploadButton from "@/components/ui/upload-button";
import FileCard from "@/components/ui/file-card";
import Image from 'next/image';
import { Loader2 } from 'lucide-react'
import SearchBar from "@/components/ui/search-bar";
import { useState } from "react";
import debounce from 'lodash.debounce';


function EmptyPage() {
  return (
    <div className="flex  items-center flex-col  gap-8 w-full  mt-11 ">
      <Image className=" mb-5" src="/empty.svg" width={500} height={500} alt="empty icon " />
      <p className="text-4xl p-2">You currently have no content , upload your first video</p>
      <UploadButton size="lg" />

    </div>

  )
}
export default function Home() {
  const { user, isLoaded, isSignedIn } = useUser()
  const [query, setQuery] = useState('')


  let userId = undefined
  if (isLoaded && isSignedIn) {
    userId = user.id
  }

  let videos = useQuery(api.videos.listVideos, { "userId": userId, "query": query })
  console.log(videos)
  const isLoading = videos === undefined
  const isEmpty = videos?.length === 0







  const updateVids = debounce((q) => {
    setQuery(q)
  }, 500); // delay function call for 500ms


  return (
    <main className="container mx-auto pt-9 p-14">


      {/* mini header  */}
      <div className="flex  justify-between items-center mb-8 ">
        <h1 className="text-4xl font-bold pb-2 ">Your Videos </h1>
        <div className="flex gap-5 items-center">
          <SearchBar updateVids={updateVids} />
          <UploadButton />
        </div>
      </div>

      {
        isLoading &&
        (<div className="flex  items-center flex-col gap-8 w-full  mt-48 ">
          <Loader2 className="h-36 w-36 animate-spin" />
          <div className="text-3xl">Loading...</div>
        </div>
        )
      }


      {!isLoading && isEmpty && (
        <EmptyPage />
      )
      }




      <div className="grid grid-cols-3 gap-2 ">
        {!isLoading && videos.map((vid) => {
          return (
            <FileCard key={vid.key} vid={vid} />
          )
        })}
      </div>
    </main>
  );
}
