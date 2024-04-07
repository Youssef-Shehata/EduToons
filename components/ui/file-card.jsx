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

    <Card className=''>
      <CardHeader className='relative flex justify-between'>
        <CardTitle>{vid.title}</CardTitle>
        <div className="absolute top-2 right-2"><FileActions /></div>
      </CardHeader>
      <CardContent>
        <Image src="/squidward.jpeg" width={400} height={300} alt="squidward" />

      </CardContent>

      <CardFooter className='flex justify-items-center'>
        <CardDescription>{vid.description}</CardDescription>

        {/* <Button className="bg-trash px-2 hover:bg-redish"></Button> */}
      </CardFooter>
    </Card>


  )
}


