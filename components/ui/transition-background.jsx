import { useState, useEffect } from 'react';
import Header from './Header';

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


];

const TransitioningBackground = ({ children }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);




  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000); // Change background every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute  ">
      <Header />
      <div className=" top-0 right-0 h-screen w-screen bg-scroll bg-no-repeat bg-cover opacity-55 blur-sm transition-all duration-1000" style={{ backgroundImage: `url(${images[currentImageIndex]})` }}>
      </div>

      <div>
        <div className="absolute -top-2 -inset-1 bg-gradient-to-r from-sh7toot  bg-opacity-50 blur-sm" >
          {/* Content */}
        </div>

        <div className="absolute inset-0 flex flex-col justify-center items-center ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TransitioningBackground;