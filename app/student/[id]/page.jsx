"use client";
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from "react";
import debounce from 'lodash.debounce';
import StudentPage from "./studentPage";
import { getStudentById, getTeachers, getVideosByTeacher } from "@/app/mockData";
import { useUserContext } from '@/app/currentUserCtx';
import { redirect } from 'next/navigation';

export default function Home() {
  const { user, updateUser } = useUserContext()
  if (user.role == "teacher") redirect(`/teacher/${user.id}`)


  const [teachers, setTeachers] = useState([])
  const [isLoading, setIsLoading] = useState(true)




  useEffect(() => {
    getTeachers()
      .then((res) => {
        console.log(res);
        if (res) {
          setTeachers(res);
        } else {
          console.error('No teachers found');
        }
      })
      .catch((error) => {
        console.error('Error fetching teachers:', error);

      }).finally(() => {
        setIsLoading(false);
      });
  }, []);




  if (isLoading) {
    return (
      <main className="container mx-auto pt-9 p-14">
        <div className="flex  items-center flex-col gap-8 w-full  mt-48 ">
          <Loader2 className="h-36 w-36 animate-spin" />
          <div className="text-3xl">Loading...</div>
        </div>


      </main>
    )
  }


  return (
    <main className="container mx-auto pt-9 p-14">
      <StudentPage teachers={teachers} />
    </main>
  );
}
