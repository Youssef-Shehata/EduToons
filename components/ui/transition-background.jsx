import { useState, useEffect } from 'react';
import { SignInButton, SignUpButton, useUser } from '@clerk/nextjs'
import Link from 'next/link';

const images = [
  '/background/barebears.jpeg',
  '/background/gambol.jpeg',
  '/background/hxh.jpeg',
  '/background/itachi.jpeg',
  '/background/sponge.jpeg',

  '/background/jjk.jpeg',
  '/background/loffy.jpeg',
  '/background/loffy2.jpeg',
  '/background/toji.jpeg',


  // Add more image paths as needed
];

const TransitioningBackground = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { isSignedIn, user, isLoaded } = useUser()



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000); // Change background every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0">

      <div className=" top-0 right-0 h-screen w-screen bg-scroll bg-no-repeat bg-cover opacity-55 blur-sm transition-all duration-1000" style={{ backgroundImage: `url(${images[currentImageIndex]})` }}>
      </div>


      <div
        className="absolute inset-0 bg-gradient-to-r from-sh7toot  bg-opacity-50 blur-sm"
      >
        {/* Content */}

      </div>

      <div className="absolute inset-0 flex flex-col justify-center items-center ">
        <div className='text-8xl gluten-custom m-2'>Welcome to EduToons</div>
        {!isSignedIn &&
          <>
            <div className='text-5xl text-slate-300 edu-qld'>where learning is no longer boring,</div>
            <div className='text-5xl text-slate-300  edu-qld'>SignUp to start your journey!</div>
          </>
        }
        {!isSignedIn && isLoaded &&
          <div className="relative flex m-14 gap-24">
            <SignInButton className="w-32 h-14 text-xl  z-10 bg-blue-950 p-2 rounded-l-full hover:text-2xl transition-all" mode="modal" />
            <div className=" absolute inset-0   flex items-center justify-center">
              <div className="bg-gradient-to-r from-blue-950 to-redish p-2 w-24 h-14  "></div>
            </div>
            <SignUpButton className="w-32 h-14 text-xl  z-10 bg-redish p-2 rounded-r-full hover:text-2xl transition-all  " mode="modal" redirectUrl="/role" />
          </div>
        }


        {isSignedIn && user?.publicMetadata.role == 'student' &&
          <>
            <div className='text-5xl text-slate-300  edu-qld'>Start by exploring our list of  </div>
            <div className='text-5xl text-slate-300  edu-qld'>phenomenal teachers!</div>
            <div className="relative p-5 " >
              <Link href={`/user/${user.id}`} className=" text-6xl m-2 hover:m-0 transition-all hover:text-7xl flex justify-center gluten-custom border p-5 px-12 items-center rounded-full border-white " >Explore Teachers!</Link>
            </div>
          </>
        }

        {isSignedIn && user?.publicMetadata.role == 'teacher' &&
          <>
            <div className='text-5xl text-slate-300  edu-qld'>Enlighten the world with your wisodm !</div>
            {/* <div className='text-5xl text-slate-300  edu-qld'>click this button and upload your first video!</div> */}
            <div className="relative p-5 " >
              <Link href={`/user/${user.id}`} className=" text-6xl m-2 hover:m-0 transition-all hover:text-7xl flex justify-center gluten-custom border p-5 px-12  items-center rounded-full border-white " >Your Videos!</Link>
            </div>

          </>
        }
      </div>

    </div>
  );
};

export default TransitioningBackground;