import { useUserContext } from "@/app/currentUserCtx"
import SearchBar from "@/components/ui/search-bar"
import TeacherCard from "@/components/ui/teacher-card"
import { Star } from "lucide-react"
import { useState } from "react"



export default function StudentPage({ teachers }) {
  const { user, updateUser } = useUserContext()
  const [isFollowedOnly, setFollowedOnly] = useState(false)
  console.log("im in student page holaaaaaaaaaaa", user)

  return (
    <main className="container mx-auto p-3">
      <div className="flex  justify-between items-center mb-8 ">
        <h1 className="text-4xl font-bold pb-2 ">Teachers </h1>
        <Star className="cursor-pointer" onClick={() => setFollowedOnly(prev => !prev)}>Favourites</Star>
        <div className="flex gap-5 items-center">
          {/* <SearchBar updateVids={updateVids} /> */}
        </div>
      </div>



      <div className="grid grid-cols-3 gap-2 ">
        {teachers?.map(teacher => {
          if (isFollowedOnly && !user?.followedTeachersIds.includes(teacher.id)) {
            return null; // Return null if teacher is not followed and isFollowedOnly is true
          }
          return <TeacherCard key={teacher.id} teacher={teacher} />;
        })}


      </div>

    </main>
  )
}