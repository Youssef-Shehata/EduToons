import React from 'react'
import Link from 'next/link';


const WelcomePage = ({ user }) => {
  let isSignedIn = true
  console.log("welcome page : ", user?.publicMetadata.role == 'student')


  return (
    <><div className='text-7xl gluten-custom m-2 text-blue-500'>Welcome to EduToons</div>
      {isSignedIn && user?.publicMetadata.role == 'student' &&
        <>
          <div className='text-5xl text-slate-300  edu-qld'>Start by exploring our list of  </div>
          <div className='text-5xl text-slate-300  edu-qld'>phenomenal teachers!</div>
          <div className="relative p-5 " >
            <Link href={`/user/${user.id}`} className=" text-6xl m-2 hover:m-0 transition-all hover:text-7xl flex justify-center gluten-custom border p-5 px-12 items-center rounded-full border-white text-gray-400-200 " >Explore Teachers!</Link>
          </div>
        </>
      }

      {isSignedIn && user?.publicMetadata.role == 'teacher' &&
        <>
          <div className='text-5xl text-slate-300  edu-qld'>Enlighten the world with your wisodm !</div>
          {/* <div className='text-5xl text-slate-300  edu-qld'>click this button and upload your first video!</div> */}
          <div className="relative p-5 " >
            <Link href={`/user/${user.id}`} className=" text-6xl m-2 hover:m-0 transition-all hover:text-7xl flex justify-center gluten-custom border p-5 px-12  items-center rounded-full border-white text-gray-400-200 " >Your Videos!</Link>
          </div>

        </>
      }
    </>
  )
}

export default WelcomePage