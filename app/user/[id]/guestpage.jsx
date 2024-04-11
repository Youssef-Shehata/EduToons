import FileCard from "@/components/ui/file-card";
import { MessageCircleQuestion } from 'lucide-react';
import MicrophoneComponent from "./recorder";



export default function GuestPage({ vids, userType }) {
  console.log(vids)
  return (
    <div className="flex">
      <div className="absolute right-3 top-30 bg-slate-600 rounded-3xl py-7 px-5 h-full w-96 flex flex-col gap-3">
        <div className="flex font-bold text-3xl justify-start gap-2  items-center lemonada"> <MessageCircleQuestion /> Ask A Question!</div>
        <MicrophoneComponent />

      </div>
      <div className="grid grid-cols-3 gap-2 ">

        {

          vids?.map(vid => {

            return (<FileCard key={vid.id} vid={vid} userType={userType} />)


          })
        }
      </div>


    </div>

  )
}