import React, { useState } from 'react'
import CreatePost from './post/CreatePost';
import { useQuery } from '@tanstack/react-query';
import userimg from '../assets/userimg.png'
import AllPosts from './post/AllPosts';

function HomeUi() {
       //states
       const [selected, setSelected] = useState(1);
       const [url, setUrl] = useState('all')

       //query client
       const { data } = useQuery({ queryKey: ["authUser"] });

       return (
              <div>
                     {/* div for md screen */}
                     <div className='md:hidden flex items-center mx-5 mt-4'>
                            {/* img */}
                            <div className="avatar">
                                   <div className="w-11 h-11 rounded-full">
                                          <img src={data.user.profileImg || userimg} alt="Profile" />
                                   </div>
                            </div>

                            {/* home */}
                            <p className='text-xl font-bold cursor-pointer ms-7'>Home</p>
                     </div>

                     {/* for you / following btn */}
                     <div className='flex justify-between items-center px-auto w-full border-b border-slate-200 border-opacity-30'>
                            <div className={`w-[50%] px-auto py-4 text-center rounded-b-md ${selected === 1 ? 'border-b-4 border-blue-500' : ''} transition-all duration-300 hover:bg-stone-700 cursor-pointer`} onClick={() => {
                                   setSelected(1)
                                   setUrl('all')
                            }}>
                                   <span className='font-bold'>For You</span>
                            </div>
                            <div className={`w-[50%] px-auto py-4 text-center rounded-b-md ${selected === 2 ? 'border-b-4 border-blue-500' : ''} transition-all duration-300 hover:bg-stone-700 cursor-pointer`} onClick={() => {
                                   setSelected(2)
                                   setUrl('following')
                            }}>
                                   <span className='font-bold'>Following</span>
                            </div>
                     </div>

                     {/* self post */}
                     <CreatePost />

                     {/* posts */}
                     <AllPosts url={url} />
              </div>
       )
}

export default HomeUi