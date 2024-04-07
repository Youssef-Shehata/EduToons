
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical, Trash2 } from "lucide-react";



export default function FileActions() {
  return (
    <DropdownMenu >
      <DropdownMenuTrigger>
        <EllipsisVertical size={20} color="#ffffff" strokeWidth={1.75} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className='flex gap-1 text-gray-100  cursor-pointer hover:bg-rose-800 '>
          <Trash2 size={20} color="#ffffff" strokeWidth={1.75} />Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}