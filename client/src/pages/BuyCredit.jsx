import React from 'react';
import { plans, assets } from '../assets/assets';
const BuyCredit = () => {
  return (
    <div className='min-h-[80vh] text-center pt-14 mb-10'>
      <button className='border border-grid-400 px-10 py-2 rounded-full mb-6'>
        Our Plans
      </button>
      <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent mb-6 sm:mb-10'>
        Choose the plan that is right for you
      </h1>
      <div className='flex flex-wrap justify-center gap-10 text-left'>
        {plans.map((plan, index) => (
          <div
            key={index}
            className='bg-white drop-shadow-sm border bordered-lg py-12 px-8 text-gray-700 hover:scale-105 transition-all duration-500'
          >
            <img src={assets.logo_icon} width={40} alt='logo icon' />
            <p className='mt-3 font-semibold'>{plan.id}</p>
            <p className='text-sm'>{plan.desc}</p>
            <p className='mt-6'>
              <span className='text-3xl font-medium'>${plan.price}</span>/{' '}
              {plan.credits} credits
            </p>
            <button className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52'>
              Purchase
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCredit;
