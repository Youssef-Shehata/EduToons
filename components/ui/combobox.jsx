"use client"

import * as React from "react"

import { useMediaQuery } from "../hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar } from "./avatar"
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { useCharactersContext } from "@/app/selectedCharacterCtx"



export function ComboBoxResponsive({ selectedCharacter, setSelectedCharacter: setSelectedCharacter }) {
  const [open, setOpen] = React.useState(false)

  const isDesktop = useMediaQuery("(min-width: 768px)")


  let avatarFallback = selectedCharacter?.label.slice(0, 2)
  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen} >
        <PopoverTrigger asChild>

          {/* <Button variant="outline" className=" justify-start gluten-custom"> */}
          {/* {selectedCharacter ? <>{selectedCharacter.label}</> : <>Select Character</>} */}
          <Avatar className="mr-4 w-fill h-fill justify-center items-center">
            <AvatarImage src={selectedCharacter.img} className="flex items-center justify-self-center hover:cursor-pointer " />
            <AvatarFallback className="flex items-center justify-center ">{avatarFallback}</AvatarFallback>



          </Avatar >
          {/* </Button> */}

        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList setOpen={setOpen} setSelectedCharacter={setSelectedCharacter} />
        </PopoverContent>
      </Popover >
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start gluten-custom">
          {selectedCharacter ? <>{selectedCharacter.label}</> : <>Select Character</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList setOpen={setOpen} setSelectedCharacter={setSelectedCharacter} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function StatusList({
  setOpen,
  setSelectedCharacter,
}) {

  const { characters } = useCharactersContext()
  return (
    <Command>
      <CommandInput placeholder="Search Characters..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {characters.map((status) => (

            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                setSelectedCharacter(
                  characters.find((priority) => priority.value === value) || null
                )
                setOpen(false)
              }}
              className='flex items-center gluten-custom text-base'

            >
              <Avatar className="border-1 border-white flex items-stretch justify-center mr-4 w-fill h-fill">
                <AvatarImage src={status.img} className="flex items-center justify-center " />
                <AvatarFallback className="flex items-center justify-center ">{status.label.slice(0, 2)}</AvatarFallback>



              </Avatar >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
