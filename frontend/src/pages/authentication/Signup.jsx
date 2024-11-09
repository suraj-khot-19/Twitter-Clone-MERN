import React from 'react'
import X from '../../assets/X'
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

function Signup() {
  return (
    <div className='max-w-screen-xl mx-auto flex h-screen px-10'>
      {/* icon */}
      <div className='flex-1 hidden lg:flex items-center  justify-center'>
        <X className="fill-white lg:w-2/3" />
      </div>

      {/* form */}
      <div className='flex-1 flex flex-col justify-center items-start'>
        <span className='text-7xl font-bold'>Happening now</span>
        <span className='text-3xl font-medium mt-10'>Join today.</span>

        <button className="btn btn-outline rounded-full w-[60%] mt-8 bg-white text-black"><FcGoogle className='h-10 w-10' />Sign up with Google</button>
        <button className="btn btn-outline rounded-full w-[60%] mt-2 bg-white text-black"><FaApple className='h-10 w-10' />Sign up with Apple</button>

        {/* or div */}
        <div className='flex w-[60%] justify-center py-2'>
          <span>or</span>
        </div>

        <button className="btn btn-active btn-primary rounded-full w-[60%] text-white font-bold py-3">Create Account</button>
        <span className='text-xs w-[60%] pt-1'>By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</span>
        <span className='text-xl font-normal mt-4'>Already have an account?</span>
        <button className="btn btn-outline btn-primary rounded-full w-[60%] mt-2">Sign in</button>

      </div>
    </div>
  )
}

export default Signup