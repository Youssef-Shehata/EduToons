import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Image from 'next/image';

import FileActions from "./file-actions";

export default function FileCard({ vid }) {
  return (

    <Card className='border-0'>
      <CardHeader className='relative flex justify-between '>
        <CardTitle>{vid.title}</CardTitle>
        <div className="absolute bottom-6 right-2"><FileActions vid={vid} /></div>
      </CardHeader>
      <CardContent className=" flex justify-center items-center">
        <video className=" mt-1 " width="400" height='300' controls loop muted preload="metadata">
          <source src={vid.url} type="video/mp4" />
          {/* <track
            src="/path/to/captions.vtt"
            kind="subtitles"
            srcLang="en"
            label="English"
          /> */}
          Your browser does not support the video tag.
        </video>
      </CardContent>


      <CardFooter className='flex justify-start'>
        <CardDescription className='text-1xl'>{vid.description}</CardDescription>

      </CardFooter>
    </Card>


  )
}


