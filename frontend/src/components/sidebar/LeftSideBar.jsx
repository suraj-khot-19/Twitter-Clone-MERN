import {GoHomeFill,FaSearch,IoNotifications,userimg,CgMoreO,FaRegUser ,X} from '../../utils/ImportsInOneFile'

import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom'
import useLogout from '../../hooks/useLogout';

function LeftSideBar() {
       // clicked profile
       const [showLogOut, setShowLogOut] = useState(false)

       //query client
       const { data } = useQuery({ queryKey: ["authUser"] });

       //my hook
       const { loggingOut } = useLogout();

       // logout fun
       function handelClick(e) {
              e.preventDefault();
              loggingOut();
       }

       return (
              <div className='flex flex-col justify-center items-start ms-0 xl:ms-20  p-4 h-full'>
                     {/* logo */}
                     <Link to='/'>
                            <X className='w-8 ml-5 fill-white' />
                     </Link>

                     {/* first div */}
                     <div className='flex flex-col items-start justify-between w-full h-full'>
                            {/* navs */}
                            <div className='my-2'>
                                   {/* home */}
                                   <Link to='/' className='flex my-3 py-2 hover:bg-stone-900 transition-all rounded-full duration-300'>
                                          <GoHomeFill className='h-7 w-7 ml-5 mr-5' />
                                          <span className='text-xl font-semibold opacity-80 hover:opacity-100 cursor-pointer'>Home</span>
                                   </Link>
                                   {/* explore */}
                                   <div className='flex my-3 py-2 hover:bg-stone-900 transition-all rounded-full duration-300'>
                                          <FaSearch className='h-7 w-7 ml-5 mr-5' />
                                          <span className='text-xl font-semibold opacity-80 hover:opacity-100 cursor-pointer'>Explore</span>
                                   </div>
                                   {/* Notification */}
                                   <div className='flex my-3 py-2 hover:bg-stone-900 transition-all rounded-full duration-300'>
                                          <IoNotifications className='h-7 w-7 ml-5 mr-5' />
                                          <span className='text-xl font-semibold opacity-80 hover:opacity-100 cursor-pointer'>Notification</span>
                                   </div>
                                   {/* Premium */}
                                   <div className='flex my-3 py-2 hover:bg-stone-900 transition-all rounded-full duration-300'>
                                          <X className='h-7 w-7 ml-5 mr-5 fill-white' />
                                          <span className='text-xl font-semibold opacity-80 hover:opacity-100 cursor-pointer'>Premium</span>
                                   </div>
                                   {/* Profile */}
                                   <Link to={`/profile/${data?.user?.username}`} className='flex my-3 py-2 hover:bg-stone-900 transition-all rounded-full duration-300'>
                                          <FaRegUser className='h-7 w-7 ml-5 mr-5' />
                                          <span className='text-xl font-semibold opacity-80 hover:opacity-100 cursor-pointer'>Profile</span>
                                   </Link>
                                   {/* more */}
                                   <div className='flex my-3 py-2 hover:bg-stone-900 transition-all rounded-full duration-300 '>
                                          <CgMoreO className='h-7 w-7 ml-5 mr-5' />
                                          <span className='text-xl font-semibold opacity-80 hover:opacity-100 cursor-pointer'>More</span>
                                   </div>
                                   {/* post btn */}
                                   <div className='flex my-3'>
                                          <button className="btn btn-active btn-primary rounded-full w-full text-white font-bold py-3">Post</button>
                                   </div>
                            </div>

                            {/* secound div */}
                            {/* profile */}
                            <div className="flex items-center justify-between w-full px-4  hover:bg-stone-900 transition-all rounded-full duration-300 py-2">
                                   {/* img and name */}
                                   <div className="flex items-center cursor-pointer" onClick={() => setShowLogOut((prev) => !prev)} >
                                          {/* img */}
                                          <div className="avatar">
                                                 <div className="w-11 h-11 rounded-full">
                                                        <img src={data.user.profileImg || userimg} alt="Profile" />
                                                 </div>
                                          </div>

                                          {/* name and username */}
                                          <div className="ms-4 flex flex-col items-start justify-center" >
                                                 <span>{data.user.fullname}</span>
                                                 <span>{data.user.username}</span>
                                          </div>
                                   </div>


                                   {/* logout div */}
                                   {
                                          showLogOut && <div className='absolute left-32 bottom-24 cursor-pointer z-50 bg-black' onClick={(e) => {
                                                 handelClick(e)
                                          }}>
                                                 <div className='border-slate-300 border-2 border-opacity-20 px-4 py-2 rounded-lg flex justify-center items-center gap-1 shadow-slate-500 shadow-md font-semibold text-lg'>
                                                        <span>Log out</span>
                                                        <span>@{data.user.username}</span>
                                                 </div>
                                          </div>
                                   }
                            </div>
                     </div>
              </div>
       )
}

export default LeftSideBar