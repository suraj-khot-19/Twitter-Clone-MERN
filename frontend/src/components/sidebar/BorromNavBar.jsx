import React from 'react'
import { GoHome } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from 'react-router-dom';
import PostSvg from '../../assets/PostSvg';

export default function BorromNavBar(props) {
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
                                   {/* mail */}
                                   <div className='w-[20%]'>
                                          <MdOutlineEmail className='text-2xl mx-auto' />
                                   </div>

                                   {/* noti */}
                                   <div className='w-[20%]'>
                                          <IoNotificationsOutline className='text-2xl mx-auto' />
                                   </div>
                                   {/* user */}
                                   <Link to={`/profile/${props.user.username}`} className='w-[20%]'>
                                          <FaRegUser className='text-xl mx-auto' />
                                   </Link>
                            </div>
                     </div>

                     {/* post btn */}
                     <div className='fixed right-3 bottom-20 z-50 bg-blue-500 hover:bg-blue-950 hover:scale-100 p-4 rounded-full'>
                            <PostSvg className='fill-white h-7 w-7' />
                     </div>
              </div>
       )
}
