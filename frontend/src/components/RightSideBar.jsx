import React from 'react'
import { FaSearch } from "react-icons/fa";
import SoloUserFollowContainer from './SoloUserFollowContainer';

function RightSideBar() {
       return (
              <div className='w-full py-2 px-4'>
                     {/* search */}
                     <div>
                            <label className="input input-bordered flex items-center gap-2 rounded-full ">
                                   <FaSearch />
                                   <input type="text" className="grow " placeholder="Search" />
                            </label>
                     </div>

                     {/* premimum */}
                     <div className='rounded-2xl border-2 border-stone-700 px-4 py-2 my-3'>
                            <p className='text-xl font-bold my-1'>Subscribe to Premium</p>
                            <p className='text-sm my-1'>Subscribe to unlock new features and if eligible, receive a share of revenue.</p>
                            <div className='mt-3'>
                                   <button className="btn btn-active btn-primary rounded-full w-fit text-white font-bold px-5">Subscribe</button>
                            </div>
                     </div>


                     {/* who to follow */}
                     <div className='rounded-2xl border-2 border-stone-700 px-4 py-2 my-3'>
                            <p className='text-xl font-bold my-1'>Who to follow</p>
                            <SoloUserFollowContainer user={{fullname:'rowdy',username:'rowdy'}}/>
                            <label className='text-blue-400 cursor-pointer mt-5'>show more</label>
                     </div>
              </div>
       )
}

export default RightSideBar