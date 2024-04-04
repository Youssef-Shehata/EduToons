"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api"
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { user, isLoaded, isSignedIn } = useUser()
  let videos = []
  let userId = undefined
  if (isLoaded && isSignedIn) {
    console.log(user)
    userId = user.id
  }
  videos = useQuery(api.videos.listVideos, { "userId": userId })


  const createVid = useMutation(api.videos.createVideo)
  return (
    <>
      {videos?.map((vid) => {
        return <div key={vid.id}> {vid.name} </div>
      })}

      <div>
        <Button onClick={() => createVid({
          id: "1",
          name: "Dr mike out of context",
          userId: "user_2eZOJkmPXdACa9GSADvNQAjNQZA",
          description: "mikeIsratelBeingGayFor15Mins",
        })}> upload vid </Button>
      </div>
    </>
  );
}
