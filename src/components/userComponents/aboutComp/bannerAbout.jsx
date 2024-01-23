import React from 'react';
import './styleParallax.css'
import { useParallax } from 'react-scroll-parallax';
import { RollerShades } from '@mui/icons-material';

import imageOne from '../../../assets/banners/bannerImageOne.webp'
import imageThree from '../../../assets/banners/searchEmployee.avif'
import imageHead from '../../../assets/banners/bannerHeader.png'
const BannerAbout = () => {

  const parallaxImageOne = useParallax({
    rotateX: [-270, 270],
    rotate: [-50, 50 , -50],
  });
  const parallaxImageTwo = useParallax({
    rotateX: [-270, 0 , 0 ,-270],
    
  });



  return (
    <div className='grid max-lg:gap-[3rem] lg:gap-[7rem] pb-[2rem]'>
      <section className={`max-w-full aspect-[3] flex flex-col  items-center bg-gray-700/20 justify-center text-4xl  `}
      >
      

        <h1 className='text-center  py-[5rem]  font-[500] max-md:text-xl '>Lets build Our Career Through <br /> CareerHarbor</h1>
        <img className=' max-w-[70vw] aspect-auto' src={imageHead} />

        <RollerShades className='!text-5xl' />
        {/* <div className="absolute-text">
              <h2 ref={parallaxEasingLeft.ref}>For members only non profitable</h2>
              <h1 ref={parallaxEasing.ref}>MEMBERSHIP WEBSITE</h1>
            </div> */}
      </section>
      <br />
      {/* <section className="card-container" ref={scaleCParallax.ref}>
            <div className="card">
              <img src="https://images.pexels.com/photos/2422294/pexels-photo-2422294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
            </div>
            <div className="card">
              <img src="https://images.pexels.com/photos/2422290/pexels-photo-2422290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
            </div>
          </section>
    
          <br /> */}
      <br />
      <section className="max-w-full aspect-[2] flex items-center justify-center text-4xl font-[300] text-cente">
        <img ref={parallaxImageOne.ref} className=' max-w-[70vw] aspect-auto' src={imageOne} />
      </section>




      <br />
      <section className="max-w-full aspect-[2] flex  items-center justify-center text-4xl font-[300] text-cente">
        <div ref={parallaxImageTwo.ref} >
          <img src={imageThree} />
        </div>
      </section>

      <section className="max-w-full aspect-[2] flex   items-center justify-center text-4xl font-[300] text-cente">
        {/* <img
             
              src="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            /> */}

        <h1 className='text-5xl '>The End</h1>
        {/* <div className="absolute-text">
              <h2 ref={parallaxEasingLeft.ref}>For members only non profitable</h2>
              <h1 ref={parallaxEasing.ref}>MEMBERSHIP WEBSITE</h1>
            </div> */}
      </section>
    </div>
  );
};

export default BannerAbout;
