import React, { useState } from 'react'
import X from '../../assets/X'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from 'react-hot-toast';

function Login() {
  //state
  const [data, setData] = useState({ username: '', password: '' })

  //navigator
  const navigate = useNavigate();

  //form change
  const handelOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  //form submit
  const handlelSubmit = (e) => {
    e.preventDefault();
    mutate(data)
  }

  //query client
  const queryClient = useQueryClient();

  //mutate fu
  const { mutate, isError, isLoading, error } = useMutation({
    mutationFn: async (data) => {
      //destructure data
      const { username, password } = data;

      //all url came from config
      const url = '/api/v2/auth/login'
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });

        //res
        const jsonData = await res.json();

        if (!res.ok) {
          throw new Error(jsonData.msg || 'Failed to login')
        }
        return jsonData;
      } catch (error) {
        throw error.message
      }
    },
    onSuccess: (jsonData) => {
      toast.success(`Welcome ${jsonData.user.fullname}!`);
      setData({ username: '', password: '' })
      queryClient.invalidateQueries({ queryKey: ['authUser'] })
      navigate('/');
    }
  });


  return (
    <div className='max-w-screen-xl mx-auto flex h-screen px-10 md:flex-row flex-col'>
      {/* icon */}
      <div className='md:flex-1 h-1/5 md:h-[35%] lg:h-full flex items-center justify-center'>
        <X className="fill-white w-[10rem] md:w-2/3" />
      </div>

      {/* butttons  */}
      <div className='md:flex-1 h-4/5 md:h-[65%] lg:h-full flex flex-col justify-center items-center md:items-start'>
        <span className='text-2xl md:text-5xl font-bold'>Sign in to X</span>

        <button className="btn btn-outline rounded-full w-full md:w-[60%] mt-8 bg-white text-black"><FcGoogle className='h-6 w-6' />Sign in with Google</button>
        <button className="btn btn-outline rounded-full w-full md:w-[60%] mt-2 bg-white text-black"><FaApple className='h-6 w-6' />Sign in with Apple</button>

        {/* or div */}
        <div className='flex w-full md:w-[60%] justify-center py-2'>
          <span>or</span>
        </div>

        {/* login form */}
        <div className='w-full'>
          <form onSubmit={handlelSubmit}>

            {/* username */}
            <div className='w-full md:w-[60%] my-3'>
              <label className="input input-bordered flex items-center gap-2">
                <AiOutlineUser />
                <input type="text" className="grow w-full" placeholder="Username" name='username' value={data.username} onChange={handelOnChange} />
              </label>
            </div>

            {/* password */}
            <div className='w-full md:w-[60%] my-3'>
              <label className="input input-bordered flex items-center gap-2">
                <RiLockPasswordFill />
                <input type="password" className="grow w-full" placeholder='password' name='password' value={data.password} onChange={handelOnChange} autoComplete='true' />
              </label>
            </div>

            {/* error */}
            {isError && <div className='my-3 text-red-400'>{error}</div>}

            <button type='submit' className="btn btn-active btn-primary rounded-full w-full md:w-[60%] text-white font-bold py-3">{isLoading ? 'Loading...' : 'Log in'}</button>

          </form>
        </div>

        <span className='text-xl font-normal mt-4'>Don't have an account?</span>

        <Link to='/signup' className="btn btn-outline btn-primary rounded-full w-full md:w-[60%] mt-2">Create Account</Link>

      </div>
    </div>
  )
}

export default Login