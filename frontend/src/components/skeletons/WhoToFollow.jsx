import React from 'react'

function WhoToFollow() {
       return (
              <div className='my-3'>
                     <div className="flex w-full flex-col gap-4">
                            <div className="flex items-center gap-4 w-full">
                                   {/* profile */}
                                   <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>

                                   <div className='flex justify-between w-full items-center'>
                                          {/* username fullname */}
                                          <div className="flex flex-col gap-4">
                                                 <div className="skeleton h-4 w-20"></div>
                                                 <div className="skeleton h-4 w-28"></div>
                                          </div>

                                          {/* follow btn */}
                                          <div className="">
                                                 <div className="skeleton h-10 w-20 rounded-full"></div>
                                          </div>
                                   </div>
                            </div>
                     </div>
              </div>
       )
}

export default WhoToFollow