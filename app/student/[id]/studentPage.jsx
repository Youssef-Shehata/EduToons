import { useUserContext } from "@/app/currentUserCtx"
import SearchBar from "@/components/ui/search-bar"
import TeacherCard from "@/components/ui/teacher-card"
import { Star } from "lucide-react"
import { useState } from "react"



export default function StudentPage({ teachers }) {
  const { user, updateUser } = useUserContext()
  const [isFollowedOnly, setFollowedOnly] = useState(false)

  return (
    <main className="container mx-auto p-3">
      <div className="flex  justify-between items-center mb-8 ">
        <h1 className="text-4xl font-bold pb-2 ">Teachers </h1>
        <div className={`cursor-pointer mr-3 text-3xl lemonada flex items-center gap-2 ${isFollowedOnly ? "text-yellow-400 " : "text-white"}`} onClick={() => setFollowedOnly(prev => !prev)} > Followed<Star /></div>
      </div>
      <div className="grid grid-cols-3 gap-2 ">
        {teachers?.map(teacher => {
          if (isFollowedOnly && !user?.followedTeachersIds.includes(teacher.id)) {
            return null;
          }
          return <TeacherCard key={teacher.id} teacher={teacher} />;
        })}
      </div>
    </main>
  )
}