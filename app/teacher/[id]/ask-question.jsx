import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import Chat from "./chat";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Button } from "@/components/ui/button";
import { CircleHelp } from 'lucide-react';

const AskQuestion = ({ res, setRes, isResponding, setIsResponding }) => {
  return (
    <Sheet >
      <SheetTrigger asChild>
        <div>
          <TooltipProvider delayDuration={50} skipDelayDuration={500}>
            <Tooltip>
              <TooltipTrigger asChild>
                <CircleHelp className="cursor-pointer hover:text-blue-300 " size={38} strokeWidth={2.57} absoluteStrokeWidth />
              </TooltipTrigger>
              <TooltipContent>
                <p>Ask A Question ?</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

        </div>

      </ SheetTrigger>
      <SheetContent side="right" className="w-[500px] overflow-y-scroll ">
        <SheetHeader>
          <SheetDescription className="flex justify-center items-center">
            <Chat result={res} setResult={setRes} isResponding={isResponding} setIsResponding={setIsResponding} />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default AskQuestion