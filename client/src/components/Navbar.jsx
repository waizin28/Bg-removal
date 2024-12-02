import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { useClerk, useUser, UserButton } from '@clerk/clerk-react';
const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();

  return (
    <div className='flex items-center justify-between mx-4 py-3 lg:mx-44'>
      <Link to='/'>
        <img className='w-32 lg:w-44' src={assets.logo} alt='website logo' />
      </Link>
      {isSignedIn ? (
        <div>
          <UserButton />
        </div>
      ) : (
        <button
          className='bg-zinc-800 text-white flex items-center gap-4 px-4 py-2 sm:px-8 sm:py-3 text-sm rounded-full'
          onClick={() => openSignIn({})}
        >
          Get Started{' '}
          <img
            className='w-3 sm:w-4'
            src={assets.arrow_icon}
            alt='arrow logo'
          />
        </button>
      )}
    </div>
  );
};

export default Navbar;
