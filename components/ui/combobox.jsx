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


const statuses = [
  {
    value: "naruto",
    label: "Naruto",
    img: "/characters/Naruto.jpeg"
  },
  {
    value: "petergriffen",
    label: "Peter Griffen",
    img: "/characters/petergriffen.jpeg"

  },

]

export function ComboBoxResponsive() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [selectedStatus, setSelectedStatus] = React.useState(
    statuses[0]
  )




  console.log(selectedStatus.img)


  let avatarFallback = selectedStatus?.label.slice(0, 2)
  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen} >

        <Avatar className="border-1 border-white mr-4">
          <AvatarImage src={selectedStatus.img} className="flex items-center " />
          <AvatarFallback className="flex items-center justify-center ">{avatarFallback}</AvatarFallback>



        </Avatar >
        <PopoverTrigger asChild>

          <Button variant="outline" className="w-[150px] justify-start">
            {selectedStatus ? <>{selectedStatus.label}</> : <>Select Character</>}
          </Button>

        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
        </PopoverContent>
      </Popover >
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedStatus ? <>{selectedStatus.label}</> : <>Select Character</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function StatusList({
  setOpen,
  setSelectedStatus,
}) {
  return (
    <Command>
      <CommandInput placeholder="Search Characters..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {statuses.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                setSelectedStatus(
                  statuses.find((priority) => priority.value === value) || null
                )
                setOpen(false)
              }}

            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
