import React from 'react'
import userimg from '../../assets/userimg.png'
import { formatPostDate } from '../../utils/FormatDataFun'
import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import ViewSvg from '../../assets/ViewSvg'
import demo from '../../assets/demo.png'

function SinglePostWithProp(props) {
       // destructure post
       const { user, createdAt, title, img, comments, likes } = props.post;

       // rand num
       const rand = () => {
              return Math.floor(100 * Math.random());
       }
       const randNum=rand();

       return (
              <div className='border-b border-slate-200 border-opacity-30 flex flex-col items-start justify-between'>
                     {/* top of post*/}
                     <div className='flex items-center mx-5 mt-4'>
                            {/* img */}
                            <div className="avatar">
                                   <div className="w-9 h-9 rounded-full">
                                          <img src={user.profileImg || userimg} alt="Profile" />
                                   </div>
                            </div>

                            {/* next to img */}
                            <div className='ms-2 flex flex-col justify-center'>
                                   {/* info */}
                                   <div className=''>
                                          <span className='text-base font-semibold'>{user.fullname}</span>
                                          <span className='text-base text-stone-500 ms-3'>@{user.username}</span>
                                          <span className='mx-1'>·</span>
                                          <span className='text-base text-stone-500 ms-3'>{formatPostDate(createdAt)}</span>
                                   </div>

                                   {/* post title */}
                                   <div>
                                          <span className='text-base font-semibold'>{title}</span>
                                   </div>
                            </div>
                     </div>

                     {/* img to center */}
                     <div className='mx-auto w-[80%] overflow-x-hidden my-2 rounded-lg border-stone-400 border-opacity-90'>
                            {img ? (
                                   <img
                                          src={post.img}
                                          className='h-80 object-contain rounded-2xl border border-gray-700'
                                          alt=''
                                   />
                            ) : (
                                   <img src={demo} />
                            )}
                     </div>

                     {/* bottom of post */}
                     <div className='flex w-full my-3 justify-center items-center'>
                            {/* comment */}
                            <div className='w-[25%]'>
                                   <div className='flex justify-center items-center w-full'>
                                          <FaRegComment className=' h-5 w-5 cursor-pointer opacity-80  hover:opacity-100' />
                                          <span className='ms-1 text-base text-stone-500'>{comments.length}</span>
                                   </div>
                            </div>

                            {/* repost */}
                            <div className='w-[25%]'>
                                   <div className='flex justify-center items-center w-full '>
                                          <BiRepost className='h-8 w-8 cursor-pointer opacity-80 hover:opacity-100' />
                                          <span className='ms-1 text-base text-stone-500'>{'0'}</span>
                                   </div>
                            </div>

                            {/* like */}
                            <div className='w-[25%]'>
                                   <div className='flex justify-center items-center w-full '>
                                          <FaRegHeart className='h-5 w-5 cursor-pointer opacity-80  hover:opacity-100' />
                                          <span className='ms-1 text-base text-stone-500'>{likes.length}</span>
                                   </div>
                            </div>
                            {/* view */}
                            <div className='w-[25%]'>
                                   <div className='flex justify-center items-center w-full '>
                                          <ViewSvg className='fill-white h-5 w-5 cursor-pointer opacity-80  hover:opacity-100' />
                                          <span className='ms-1 text-base text-stone-500'>{randNum}</span>
                                   </div>
                            </div>
                     </div>
              </div>
       );
}

export default SinglePostWithProp