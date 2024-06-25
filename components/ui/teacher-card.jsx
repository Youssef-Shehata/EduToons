'use client'

import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Image from 'next/image';

export default function TeacherCard({ teacher }) {
  const router = useRouter()

  return (

    <Card className="cursor-pointer rounded-full border-transparent flex justify-center items-center flex-col" >

      <CardContent className=" flex justify-center items-center">
        <Image src={teacher.img} width={250} height={250} className="rounded-full border-0" alt="teacher image" onClick={() => router.push(`/teacher/${teacher.id}`)} />
      </CardContent>
      <CardHeader className=' '>
        <CardTitle>{teacher.name}</CardTitle>
      </CardHeader>
    </Card>
  )
}


