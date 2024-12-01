import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <div className='flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20 '>
      {/* Left side */}
      <div>
        <h1 className='text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neural-700 leading-tight'>
          Remove the <br className='max-md:hidden' />
          <span className='bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent'>
            background
          </span>{' '}
          from <br className='max-md:hidden' /> images for free
        </h1>
        <p className='my-6 text-[15px] text-gray-500'>
          Say goodbye to distracting backgrounds and hello to stunning,{' '}
          <br className='max-sm:hidden' />
          professional visuals! Our online background remover makes it{' '}
          <br className='max-sm:hidden' />
          easy to create transparent or customized images in just a few clicks.
        </p>
        <div>
          <input type='file' name='' id='uploadImage' hidden />
          <label
            className='inline-flex gap-3 px-8 py-3 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transition-all duration-700'
            htmlFor='uploadImage'
          >
            <img width={20} src={assets.upload_btn_icon} alt='' />
            <p className='text-white text-sm'>Upload your image</p>
          </label>
        </div>
      </div>

      {/* Right side */}
      <div className='w-full max-w-md'>
        <img src={assets.header_img} alt='header image' />
      </div>
    </div>
  );
};

export default Header;
