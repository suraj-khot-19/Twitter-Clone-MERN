import React from 'react'
import X from '../assets/X'
import { GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { CgMoreO } from "react-icons/cg";
import { Link } from 'react-router-dom'
import { SlLogout } from "react-icons/sl";

function LeftSideBar() {
       return (
              <div className='flex flex-col justify-center items-start ms-20 p-4 h-full'>
                     {/* logo */}
                     <X className='w-8 ml-5 fill-white' />

                     {/* first div */}
                     <div className='flex flex-col items-start justify-between w-full h-full'>
                            {/* navs */}
                            <div className='my-2'>
                                   {/* home */}
                                   <div className='flex my-7'>
                                          <GoHomeFill className='h-7 w-7 ml-5 mr-5' />
                                          <span className='text-xl font-semibold opacity-80 hover:opacity-100 cursor-pointer'>Home</span>
                                   </div>
                                   {/* explore */}
                                   <div className='flex my-7'>
                                          <FaSearch className='h-7 w-7 ml-5 mr-5' />
                                          <span className='text-xl font-semibold opacity-80 hover:opacity-100 cursor-pointer'>Explore</span>
                                   </div>
                                   {/* Notification */}
                                   <div className='flex my-7'>
                                          <IoNotifications className='h-7 w-7 ml-5 mr-5' />
                                          <span className='text-xl font-semibold opacity-80 hover:opacity-100 cursor-pointer'>Notification</span>
                                   </div>
                                   {/* Premium */}
                                   <div className='flex my-7'>
                                          <X className='h-7 w-7 ml-5 mr-5 fill-white' />
                                          <span className='text-xl font-semibold opacity-80 hover:opacity-100 cursor-pointer'>Premium</span>
                                   </div>
                                   {/* Profile */}
                                   <div className='flex my-7'>
                                          <FaRegUser className='h-7 w-7 ml-5 mr-5' />
                                          <span className='text-xl font-semibold opacity-80 hover:opacity-100 cursor-pointer'>Profile</span>
                                   </div>
                                   {/* more */}
                                   <div className='flex my-7'>
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
                            <div className="flex items-center justify-between w-full">
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
                                                 <span>Rowdy Khot</span>
                                                 <span>rowdy@45</span>
                                          </div>
                                   </div>

                                   {/* more button */}
                                   <div className="flex items-center">
                                          <SlLogout className='opacity-80 hover:opacity-100 cursor-pointer'/>
                                   </div>
                            </div>
                     </div>
              </div>
       )
}

export default LeftSideBar