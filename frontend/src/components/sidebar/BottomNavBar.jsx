import { GoHome, FaSearch, IoNotificationsOutline, PostSvg,FaRegUser, IoSettingsOutline } from '../../utils/ImportsInOneFile'

import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useLogout from '../../hooks/useLogout';

export default function BottomNavBar() {
       const { data: user } = useQuery({ queryKey: ['authUser'] })

       // clicked profile
       const [showLogOut, setShowLogOut] = useState(false)

       //my hook
       const { loggingOut } = useLogout();

       // logout fun
       function handelClick(e) {
              e.preventDefault();
              loggingOut();
       }

       return (
              <div>
                     {/* // bottom bar */}
                     <div className='w-screen fixed bottom-0 left-0 right-0 py-2 bg-black z-50'>
                            <div className='flex justify-center items-center w-full'>
                                   {/* home */}
                                   <Link to='/' className='w-[20%]'>
                                          <GoHome className='text-2xl mx-auto' />
                                   </Link>
                                   {/* search */}
                                   <div className='w-[20%]'>
                                          <FaSearch className='text-xl mx-auto' />
                                   </div>
                                   {/* noti */}
                                   <div className='w-[20%]'>
                                          <IoNotificationsOutline className='text-2xl mx-auto' />
                                   </div>
                                   {/* user */}
                                   <Link to={`/profile/${user?.user?.username}`} className='w-[20%]'>
                                          <FaRegUser className='text-xl mx-auto' />
                                   </Link>
                                   {/* setting */}
                                   <div className='w-[20%]' onClick={() => setShowLogOut((prev) => !prev)}>
                                          <IoSettingsOutline className='text-2xl mx-auto' />
                                   </div>
                            </div>
                     </div>

                     {/* post btn */}
                     {
                            !showLogOut &&
                            <div className='fixed right-3 bottom-20 z-50 bg-blue-500 hover:bg-blue-950 hover:scale-100 p-4 rounded-full'>
                                   <PostSvg className='fill-white h-7 w-7' />
                            </div>
                     }

                     {/* logout div */}
                     {
                            showLogOut && <div className='absolute right-3 bottom-20 cursor-pointer z-50 bg-black' onClick={(e) => {
                                   handelClick(e)
                            }}>
                                   <div className='border-slate-300 border-2 border-opacity-20 px-4 py-2 rounded-lg flex justify-center items-center gap-1 shadow-slate-500 shadow-md font-semibold text-base'>
                                          <span>Log out</span>
                                          <span>@{user?.user?.username}</span>
                                   </div>
                            </div>
                     }
              </div>
       )
}
