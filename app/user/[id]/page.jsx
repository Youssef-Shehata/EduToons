"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api"
import { useUser } from "@clerk/nextjs";
import UploadButton from "@/components/ui/upload-button";
import FileCard from "@/components/ui/file-card";
import Image from 'next/image';
import { Loader2 } from 'lucide-react'
import SearchBar from "@/components/ui/search-bar";
import { useEffect, useState } from "react";
import debounce from 'lodash.debounce';
import TeacherHeader from "./TeacherHeader";
import StudentPage from "./studentPage";

export async function getUsers() {
  try {
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    const teacherIds = []
    const teachers = data.users.filter(user => {
      if (user.publicMetadata.role == "teacher") {
        teacherIds.push(user.id)
        return user
      }
    })
    return { teacherIds: teacherIds, teachers: teachers }
  } catch (error) {
    console.error('Error fetching users:', error);

  }
  return undefined
}


function EmptyPage({ userType }) {
  console.log(userType)
  let message = "";
  switch (userType) {
    case "teacher":
      message = "You currently have no content, upload your first video";
      break;
    case "guest":
      message = "No content yet";
      break;
    // case "student":
    //   message = "You're not a teacher, homie";
    //   break;
    case "404":
      message = "Your favorite teacher isn't here yet, maybe give them a call?";
      break;
    default:
      break;
  }

  return (
    <div className="flex items-center flex-col gap-8 w-full mt-11">
      <Image className="mb-5" src="/empty.svg" width={500} height={500} alt="empty icon" />
      <p className="text-4xl p-2">{message}</p>
      {userType === "teacher" && <UploadButton size="lg" />}
    </div>
  );
}

export default function Home({ params }) {
  const { user, isLoaded, isSignedIn } = useUser()
  const [query, setQuery] = useState('')
  const [teacherIds, setTeachersIds] = useState([])
  const [teachers, setTeachers] = useState([])

  const [userId, setUserId] = useState('')
  const [userRole, setUserRole] = useState('')

  useEffect(() => {
    getUsers().then((res) => {
      setTeachersIds(res.teacherIds)
      setTeachers(res.teachers)
    })
    setUserId(user?.id)
    setUserRole(user?.publicMetadata.role)

  }, [isSignedIn, isLoaded])

  let userType = ''
  console.log(teacherIds)
  if (userId != params.id && !teacherIds.includes(params.id)) userType = "404"
  else if (userId == params.id && userRole == "teacher") userType = "teacher"
  else if (userId == params.id && userRole == "student") userType = "student"
  else if (userId != params.id) userType = "guest"
  // userType = "student"
  console.log(userType)








  const updateVids = debounce((q) => {
    setQuery(q.toString().toLowerCase().trim())
  }, 500); // delay function call for 500ms

  let videos = useQuery(api.videos.listVideos, { "userId": params.id, })
  const isEmpty = videos?.length === 0

  if (query?.length > 0) {
    // query = query
    videos = videos.filter((file) =>
      file.title.toLowerCase().includes(query)
    );
  }
  const isLoading = videos === undefined











  return (
    <main className="container mx-auto pt-9 p-14">
      {/* mini header  */}
      {userType == "teacher" &&
        <TeacherHeader updateVids={updateVids} />
      }


      {userType == "student" &&
        <StudentPage teachers={teachers} />
      }

      {isLoading &&
        (
          <div className="flex  items-center flex-col gap-8 w-full  mt-48 ">
            <Loader2 className="h-36 w-36 animate-spin" />
            <div className="text-3xl">Loading...</div>
          </div>
        )}


      {!isLoading && isEmpty && userType != "student" &&
        (
          <EmptyPage userType={userType} />
        )}

      <div className="grid grid-cols-3 gap-2 ">
        {!isLoading && userType != "404" && userType != "student" && videos.map((vid) => {
          return (
            <FileCard key={vid.key} vid={vid} userType={userType} />
          )
        })}
      </div>
    </main>
  );
}
