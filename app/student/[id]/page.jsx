"use client";
import UploadButton from "@/components/ui/upload-button";
import Image from 'next/image';
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from "react";
import debounce from 'lodash.debounce';
import StudentPage from "./studentPage";
import GuestPage from "./guestpage";
import { useCharacterContext } from "@/app/selectedCharacterCtx";
import { getStudentById, getTeachers, getVideosByTeacher } from "@/app/mockData";

export default function Home() {
  const [query, setQuery] = useState('')
  const [teachers, setTeachers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { character, updateCharacter } = useCharacterContext();




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
        ``
        console.error('Error fetching teachers:', error);
      }).finally(() => {
        setIsLoading(false);
      });
  }, []);



  const updateVids = debounce((q) => {
    setQuery(q.toString().toLowerCase().trim())
  }, 500);
  let videos = []

  if (query?.length > 0) {
    // query = query
    videos = videos.filter((file) =>
      file.title.toLowerCase().includes(query)
    );
  }









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
      {/* mini header  */}
      {/* {userType == "teacher" &&
      } */}


      <StudentPage teachers={teachers} />






      {/* {!isLoading && userType != "404" && (userType == "guest" || userType == "teacher") &&
        <>  

          <GuestPage vids={videos} userType={userType} teacher={teachers.filter(teacher => teacher.id = params.id)} updateVids={updateVids} />

        </>
      }
      {!isLoading && isEmpty && userType != "student" &&
        (
          <EmptyPage userType={userType} />
        )}
 */}

    </main>
  );
}
