import React from 'react'
import X from '../assets/X'
import { GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { CgMoreO } from "react-icons/cg";
import { useNavigate } from 'react-router-dom'
import { SlLogout } from "react-icons/sl";
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';


function LeftSideBar() {
       //client
       const queryClient = useQueryClient();

       //query client
       const { data } = useQuery({ queryKey: ["authUser"] });

       //navigate
       const navigate = useNavigate();

       // logout fun
       const { mutate: loggingOut, isPending } = useMutation({
              mutationFn: async () => {
                     try {
                            const res = await fetch('/api/v2/auth/logout', {
                                   method: 'POST',
                                   headers: {
                                          'Content-Type': 'application/json'
                                   }
                            });

                            const jsonData = await res.json();

                            if (!res.ok) {
                                   throw new Error(jsonData.msg || "Failed to Logout")
                            }

                     } catch (error) {
                            throw new Error(error);
                     }
              },
              //on sucess
              onSuccess: () => {
                     toast.success('logged out sucessfully!')
                     queryClient.invalidateQueries({ queryKey: ['authUser'] })
                     navigate('/login')
                     window.location.reload(); //force reload
              },
              //error
              onError: () => {
                     toast.error('Failed to Logout')
              }
       })
       return (
              <div className='flex flex-col justify-center items-start ms-20 p-4 h-full'>
                     {/* logo */}
                     <X className='w-8 ml-5 fill-white' />

                     {/* first div */}
                     <div className='flex flex-col items-start justify-between w-full h-full'>
                            {/* navs */}
                            <div className='my-2'>
                                   {/* home */}
                                   <div className='flex my-7 py-2 hover:bg-stone-900 transition-all rounded-full duration-300'>
                                          <GoHomeFill className='h-7 w-7 ml-5 mr-5' />
                                          <span className='text-xl font-semibold opacity-80 hover:opacity-100 cursor-pointer'>Home</span>
                                   </div>
                                   {/* explore */}
                                   <div className='flex my-7 py-2 hover:bg-stone-900 transition-all rounded-full duration-300'>
                                          <FaSearch className='h-7 w-7 ml-5 mr-5' />
                                          <span className='text-xl font-semibold opacity-80 hover:opacity-100 cursor-pointer'>Explore</span>
                                   </div>
                                   {/* Notification */}
                                   <div className='flex my-7 py-2 hover:bg-stone-900 transition-all rounded-full duration-300'>
                                          <IoNotifications className='h-7 w-7 ml-5 mr-5' />
                                          <span className='text-xl font-semibold opacity-80 hover:opacity-100 cursor-pointer'>Notification</span>
                                   </div>
                                   {/* Premium */}
                                   <div className='flex my-7 py-2 hover:bg-stone-900 transition-all rounded-full duration-300'>
                                          <X className='h-7 w-7 ml-5 mr-5 fill-white' />
                                          <span className='text-xl font-semibold opacity-80 hover:opacity-100 cursor-pointer'>Premium</span>
                                   </div>
                                   {/* Profile */}
                                   <div className='flex my-7 py-2 hover:bg-stone-900 transition-all rounded-full duration-300'>
                                          <FaRegUser className='h-7 w-7 ml-5 mr-5' />
                                          <span className='text-xl font-semibold opacity-80 hover:opacity-100 cursor-pointer'>Profile</span>
                                   </div>
                                   {/* more */}
                                   <div className='flex my-7 py-2 hover:bg-stone-900 transition-all rounded-full duration-300 '>
                                          <CgMoreO className='h-7 w-7 ml-5 mr-5' />
                                          <span className='text-xl font-semibold opacity-80 hover:opacity-100 cursor-pointer'>More</span>
                                   </div>
                                   {/* post btn */}
                                   <div className='flex my-7'>
                                          <button className="btn btn-active btn-primary rounded-full w-full text-white font-bold py-3">Post</button>
                                   </div>
                            </div>

                            {/* secound div */}
                            {/* profile */}
                            <div className="flex items-center justify-between w-full p-2  hover:bg-stone-900 transition-all rounded-full duration-300 py-2 ">
                                   {/* img and name */}
                                   <div className="flex items-center cursor-pointer">
                                          {/* img */}
                                          <div className="avatar">
                                                 <div className="w-11 h-11 rounded-full">
                                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Profile" />
                                                 </div>
                                          </div>

                                          {/* name and username */}
                                          <div className="ms-4 flex flex-col items-start justify-center">
                                                 <span>{data.user.fullname}</span>
                                                 <span>{data.user.username}</span>
                                          </div>
                                   </div>

                                   {/* more button */}
                                   <div className="flex items-center" onClick={(e) => {
                                          e.preventDefault();
                                          loggingOut()
                                   }}>
                                          {isPending ?
                                                 <span className="loading loading-spinner text-primary loading-lg "></span> : <SlLogout className='opacity-80 hover:opacity-100 cursor-pointer' />}
                                   </div>
                            </div>
                     </div>
              </div>
       )
}

export default LeftSideBar