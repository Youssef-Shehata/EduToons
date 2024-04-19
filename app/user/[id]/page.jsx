"use client";
import { useUser } from "@clerk/nextjs";
import UploadButton from "@/components/ui/upload-button";
import Image from 'next/image';
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from "react";
import debounce from 'lodash.debounce';
import TeacherHeader from "./TeacherHeader";
import StudentPage from "./studentPage";
import GuestPage from "./guestpage";
import { useCharacterContext } from "@/app/selectedCharacterCtx";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

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
  let img = '';
  switch (userType) {
    case "teacher":
      message = "You currently have no content, upload your first video";
      img = '/empty.svg'
      break;

    case "guest":
      message = "No content yet";
      img = '/nocontent.svg'

      break;
    // case "student":
    //   message = "You're not a teacher, homie";
    //   break;
    case "404":
      message = "Your favorite teacher isn't here yet, maybe give them a call ?";
      img = '/404.svg'

      break;

    default:
      break;
  }

  return (<div className="flex items-center flex-col gap-8 w-full mt-11">
    <Image className="mb-5" src={img} width={700} height={500} alt="empty icon" />
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
  const { character, updateCharacter } = useCharacterContext();

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
  // let videos = []
  let videos = useQuery(api.videos.listVideos, { "userId": params.id })
  const isEmpty = videos?.length === 0

  if (query?.length > 0) {
    // query = query
    videos = videos.filter((file) =>
      file.title.toLowerCase().includes(query)
    );
  }
  const isLoading = videos === undefined || !isLoaded || !teachers || teachers.length == 0












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




      {!isLoading && userType != "404" && (userType == "guest" || userType == "teacher") &&
        <>

          <GuestPage vids={videos} userType={userType} teacher={teachers.filter(teacher => teacher.id = params.id)} updateVids={updateVids} />

        </>
      }
      {!isLoading && isEmpty && userType != "student" &&
        (
          <EmptyPage userType={userType} />
        )}


    </main>
  );
}
