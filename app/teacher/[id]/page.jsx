"use client";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api"
import { Button } from "@/components/ui/button";

export default function Home() {


  const createVid = useMutation(api.videos.createVideo)
  return (
    <>

      <div>
        <Button onClick={() => createVid({
          id: "1",
          name: "Dr mike out of context",
          description: "mikeIsratelBeingGayFor15Mins",
        })}> upload vid </Button>
      </div>
    </>
  );
}
