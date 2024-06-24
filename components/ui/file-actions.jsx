
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react";
import { useToast } from "./use-toast";



export default function FileActions({ vid, userType }) {
  const deleteVideo = () => false
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { toast } = useToast()
  return (

    <>

      {userType == 'teacher' && (<>
        <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your Video
                and remove it from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={
                async () => {

                  try {
                    await deleteVideo({
                      vidId: vid._id,
                      vidStrgId: vid.id
                    })
                    toast({
                      variant: 'success',
                      title: 'Video Deleted!',
                      description: `Deleted ${vid.title} successfully.`
                    })
                  } catch (e) {
                    toast({
                      variant: 'destructive',
                      title: 'Error while deleting video!',
                      description: `couldnt delete ${vid.title} , try again later.`
                    })
                  }




                }
              }>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <DropdownMenu >
          <DropdownMenuTrigger>
            <EllipsisVertical size={20} color="#ffffff" strokeWidth={1.75} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setIsConfirmOpen(true)} className='flex gap-1 text-gray-100  cursor-pointer hover:bg-rose-800 '>
              <Trash2 size={20} color="#ffffff" strokeWidth={1.75} />Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>)}

    </>

  )
}