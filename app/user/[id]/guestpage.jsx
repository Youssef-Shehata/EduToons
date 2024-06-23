import FileCard from "@/components/ui/file-card";
import Chat from "./chat";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/ui/search-bar";
import { useState } from "react";
import { ComboBoxResponsive } from "@/components/ui/combobox";
import { useCharacterContext } from "@/app/selectedCharacterCtx";










export default function GuestPage({ vids, userType, teacher, updateVids }) {
  const [res, setRes] = useState('')
  const [isResponding, setIsResponding] = useState(false)
  const { character, updateCharacter } = useCharacterContext();

  console.log('conetxasc', character)
  let empty = false 
  if (vids.length == 0) empty = true
  const teacherVids = vids.filter(vid => {
    console.log("guest page", vid.title)
    return vid.character == 'teacher'
  })

  const studentVids = vids.filter(vid => {
    console.log("guest page", vid.title)
    console.log(character.value)
    return vid.character == character.value
  })

  return (

    <div className="flex flex-col  ">

      {userType == "guest" && < div className="flex  w-full  justify-between items-center mb-8 ">
        <div className="flex items-center justify-between gap-10">
          <div className="flex text-4xl lemonada">{`${teacher[0].firstName}'s Videos`}</div>

          <Sheet >
            <SheetTrigger asChild><Button >Ask a question ? </Button></ SheetTrigger>
            <SheetContent side="right" className="w-[500px] overflow-y-scroll ">
              <SheetHeader>
                <SheetDescription className="flex justify-center items-center">
                  <Chat result={res} setResult={setRes} isResponding={isResponding} setIsResponding={setIsResponding} />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>



        </div>

        {userType == 'guest' && <div className="flex flex-row gap-5">
          <ComboBoxResponsive selectedCharacter={character} setSelectedCharacter={updateCharacter} />

          <SearchBar updateVids={updateVids} />

        </div>}

      </div>}

      <div className="grid grid-cols-3 gap-2 ">
        {userType == "teacher" && teacherVids?.map(vid => {
          return (<FileCard key={vid.id} vid={vid} userType={userType} />)
        })
        }

        {userType != 'teacher' && studentVids?.map(vid => {
          return (<FileCard key={vid.id} vid={vid} userType={userType} />)
        })
        }


      </div>
      {userType != 'teacher' && studentVids.length == 0 && empty==false &&(
        <div className="flex justify-center items-center flex-col h-full w-full">
          <img src="/nocontent.svg" width={800} alt="empty" />
          <p className="text-3xl p-3 pb-1">This Character isn't available yet in our videos ,
          </p>
          <p className="text-3xl p-3">
            But feel free to ask it whatever questions you want !
          </p>
        </div>
      )

      }
    </div >
  )
}