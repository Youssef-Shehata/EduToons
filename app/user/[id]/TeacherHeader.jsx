import SearchBar from "@/components/ui/search-bar";
import UploadButton from "@/components/ui/upload-button";


export default function TeacherHeader({ updateVids }) {


  return (
    <div className="flex  justify-between items-center mb-8 ">
      <h1 className="text-4xl font-bold pb-2 ">Your Videos </h1>
      <div className="flex gap-5 items-center">
        <SearchBar updateVids={updateVids} />
        <UploadButton />
      </div>
    </div>
  )
}