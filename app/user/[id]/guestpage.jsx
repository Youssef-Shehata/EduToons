import FileCard from "@/components/ui/file-card";

import Chat from "./chat";
import { useState } from "react";
import { CircleHelp } from 'lucide-react';
import clsx from 'clsx';

export default function GuestPage({ vids, userType }) {
  const [chatOpen, setChatOpen] = useState(true)
  // console.log(vids)
  return (
    <div className="flex ">
      {vids?.length != 0 && <CircleHelp onClick={() => setChatOpen(!chatOpen)} />
      }

      {chatOpen &&
        <Chat />
      }

      <div className="grid grid-cols-3 gap-2 ">
        {vids?.map(vid => {
          return (<FileCard key={vid.id} vid={vid} userType={userType} />)
        })
        }
      </div>
    </div>
  )
}