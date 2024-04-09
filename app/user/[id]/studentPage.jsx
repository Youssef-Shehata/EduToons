import TeacherCard from "@/components/ui/teacher-card"



export default function StudentPage({ teachers }) {
  console.log("im in student page holaaaaaaaaaaa", teachers[0]?.imageUrl)

  return (
    <main className="container mx-auto pt-9 p-14">

      <div className="flex  justify-between items-center mb-8 ">
        <h1 className="text-4xl font-bold pb-2 ">Teachers </h1>
        <div className="flex gap-5 items-center">
          {/* <SearchBar updateVids={updateVids} /> */}
          {/* <UploadButton /> */}
        </div>
      </div>



      <div className="grid grid-cols-3 gap-2 ">
        {teachers?.map(teacher => {

          return <TeacherCard teacher={teacher} />
        })}


      </div>

    </main>
  )
}