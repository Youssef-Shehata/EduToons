"use client";
import TransitioningBackground from "@/components/ui/transition-background";

import {
  Drawer,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import WelcomePage from "@/components/ui/welcome-page";
import { useUserContext } from "./currentUserCtx";


const backend = [
  '/team/sh7toot2.jpg',
  '/team/sh7toot1.jpg',
  '/team/matar3.jpeg',

]
const frontend = [
  '/team/sh7toot3.jpg',
]
const Ui_Ux = [
  '/team/sh7toot4.jpg',
  '/team/sh7toot5.jpg',
]
const AiEngs = [
  '/team/saif4.jpeg',
  '/team/saif5.jpeg',
  '/team/samy3.jpeg',


]

const Video = [
  '/team/samy1.jpg',
  '/team/samy2.jpeg',
  '/team/sh7toot6.jpg',

  '/team/saif1.jpeg',
  '/team/saif2.jpeg',
  '/team/saif3.jpeg',

  '/team/matar1.jpeg',
  '/team/ashraf1.jpg'

]
const Audio = [
  '/team/yossef1.jpeg',
  '/team/yossef2.jpeg',
  // '/team/yosef3.jpg',
  '/team/matar2.jpeg',
  '/team/ashraf2.jpeg'
]

function Team({ team, name }) {
  return (

    <div className='flex flex-col justify-center items-center gap-3 '>
      <div> {name} </div>
      <div className="flex gap-2  ">
        {team.map(dev => {
          let oi = dev.slice(1, 3)
          return (
            <Avatar className='h-16 w-16'>
              <AvatarImage src={dev} />
              <AvatarFallback>{oi}</AvatarFallback>
            </Avatar>
          )
        })}
      </div>
    </div>

  )
}


export default function Home() {
  //To-DO: implement Your Auth  

  const { user, updateUser } = useUserContext()

  return (
    <div className="relative h-screen ">
      <TransitioningBackground >
        <WelcomePage user={user} />
        <div className='absolute bottom-1 bg-none flex items-end justify-center p-2 px-6 hover:cursor-pointer   '>
          <Drawer >
            <DrawerTrigger>About Us</DrawerTrigger>
            <DrawerContent className='pb-4'>
              <DrawerHeader className='flex items-center justify-center flex-col'>
                <DrawerTitle className="text-2xl font-serif font-bold">Meet our team !</DrawerTitle>
                {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
              </DrawerHeader>
              <DrawerFooter className='flex flex-row justify-center items-center gap-7 overflow-x-scroll '>



                <Team team={backend} name='BackEnd' />
                <Team team={frontend} name='FrontEnd' />
                <Team team={Ui_Ux} name='Ui/Ux' />
                <Team team={Audio} name='Audio' />
                <Team team={Video} name='Video' />
                <Team team={AiEngs} name='AI Engineers' />
              </DrawerFooter>
            </DrawerContent>
          </Drawer>



        </div>

      </TransitioningBackground >

    </div >
  );
}
