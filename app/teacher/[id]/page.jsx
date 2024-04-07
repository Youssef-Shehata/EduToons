"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api"
import { useUser } from "@clerk/nextjs";

import UploadButton from "@/components/ui/upload-button";
import FileCard from "@/components/ui/file-card";



export default function Home() {
  const { user, isLoaded, isSignedIn } = useUser()
  let videos = []
  let userId = undefined
  if (isLoaded && isSignedIn) {
    // console.log(user)
    userId = user.id
  }
  videos = useQuery(api.videos.listVideos, { "userId": userId })


  return (
    <main className="container mx-auto pt-9 p-14">
      <div className="flex justify-between items-center pb-2">
        <h1 className="text-rxl font-bold text-3xl pb-2 ">Your Videos </h1>
        <UploadButton />
      </div>

      <div className="grid grid-cols-3 gap-2 ">
        {videos?.map((vid) => {
          return (
            <FileCard key={vid.key} vid={vid} />

          )
        })}
      </div>
    </main>
  );
}
