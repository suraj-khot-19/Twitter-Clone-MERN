import {SoloUserFollowContainer,FaSearch,WhoToFollow} from '../../utils/ImportsInOneFile'

import React from 'react'
import { useQuery } from '@tanstack/react-query';

function RightSideBar() {
       // function to fetch
       const { data: whoToFollow, isLoading, isError, error } = useQuery({
              queryKey: ['whoToFollow'],
              queryFn: async () => {
                     const url = '/api/v2/user/suggetion'
                     try {
                            const res = await fetch(url)
                            const jsonData = await res.json();

                            if (!res.ok) {
                                   throw new Error(jsonData.msg || "Something went wrong")
                            }
                            return jsonData;
                     } catch (error) {
                            throw new Error(error)
                     }
              },
       });

       return (
              <div className='w-full py-2 px-4'>
                     {/* search */}
                     <div>
                            <label className="input input-bordered flex items-center gap-2 rounded-full">
                                   <FaSearch />
                                   <input type="text" className="grow " placeholder="Search" />
                            </label>
                     </div>

                     {/* premimum */}
                     <div className='rounded-2xl border-2 border-stone-700 px-4 py-2 my-3 border-opacity-70'>
                            <p className='text-xl font-bold my-1'>Subscribe to Premium</p>
                            <p className='text-sm my-1'>Subscribe to unlock new features and if eligible, receive a share of revenue.</p>
                            <div className='mt-3'>
                                   <button className="btn btn-active btn-primary rounded-full w-fit text-white font-bold px-5">Subscribe</button>
                            </div>
                     </div>


                     {/* who to follow */}
                     <div className='rounded-2xl border-2 border-stone-700 px-4 py-2 my-3 border-opacity-70'>
                            <p className='text-xl font-bold my-1'>Who to follow</p>

                            {isError && <span className='text-center text-red-500 font-semibold'>{error}</span>}

                            {/* map through suggested user */}
                            {!isError && isLoading ?
                                   <div>
                                          <WhoToFollow />
                                          <WhoToFollow />
                                          <WhoToFollow />
                                          <WhoToFollow />
                                   </div>
                                   :
                                   whoToFollow?.suggestedUser?.length === 0 ? <p className='text-xsl text-slate-200 font-semibold text-center'>No Suggestions</p> : whoToFollow?.suggestedUser?.map((e) => {
                                          return <SoloUserFollowContainer key={e._id} user={e} />
                                   })
                            }

                            {/* show more btn */}
                            <label className='text-blue-400 cursor-pointer mt-5'>{whoToFollow?.suggestedUser?.length === 0 ? '' : 'show more'}</label>

                     </div>
              </div>
       )
}

export default RightSideBar