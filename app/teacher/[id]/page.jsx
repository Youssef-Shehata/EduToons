"use client";
import UploadButton from "@/components/ui/upload-button";
import Image from 'next/image';
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from "react";
import debounce from 'lodash.debounce';
import SearchBar from "@/components/ui/search-bar";
import { getVideosByTeacher } from "@/app/mockData";
import FileCard from "@/components/ui/file-card";
import { useUserContext } from "@/app/currentUserCtx";




const page = ({ params }) => {

  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const { user, updateUser } = useUserContext();


  const [videos, setVideos] = useState([])

  let currentTeacherId = params.id
  let visitor = params.id == user.id ? false : true
  let userType = visitor == true ? "student" : "teacher"
  //fetching this teachers videos :
  useEffect(() => {
    getVideosByTeacher(currentTeacherId).then(res => {
      console.log(res)

      setVideos(res)
      if (res.length == 0) setIsEmpty(true)
    }).catch(err => {
      console.error("error fetching videos :", err)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])
  //Searching Logic :

  const updateVids = debounce((q) => {
    setQuery(q.toString().toLowerCase().trim())
  }, 500);

  if (query?.length > 0) {
    // query = query
    let newVids = videos.filter((file) =>
      file.title.toLowerCase().includes(query)
    );
    setVideos(newVids)
  }

  // Searching Logic 



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

      {!visitor &&
        <div className="flex  justify-between items-center mb-8 ">
          <h1 className="text-4xl font-bold pb-2 ">Your Videos </h1>
          <div className="flex gap-5 items-center">
            <SearchBar updateVids={updateVids} />
            <UploadButton />
          </div>
        </div>

      }
      {visitor &&
        <div className="flex  justify-between items-center mb-8 ">
          <h1 className="text-4xl font-bold pb-2 "> Videos </h1>
          <div className="flex gap-5 items-center">
            <SearchBar updateVids={updateVids} />
          </div>
        </div>

      }

      {isEmpty &&
        <div className="flex items-center flex-col gap-8 w-full mt-11">
          <Image className="mb-5" src={"/empty.svg"} width={700} height={500} alt="empty icon" />
          <p className="text-4xl p-2">
            {!visitor && "You Currently Have No Content , upload your first vid!"}
            {visitor && "No Content Available For Now ."}
          </p>

        </div>

      }

      {videos?.map(vid => {
        //uncomment when vids are ready
        // return (<FileCard key={vid.id} vid={vid} userType={userType} />)


        //for now 
        return (<div>{vid.title}</div>)
      })
      }

    </main>
  )
}

export default page