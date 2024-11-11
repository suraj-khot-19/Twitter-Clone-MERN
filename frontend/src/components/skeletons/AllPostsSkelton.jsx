import React from 'react'

function AllPostsSkelton() {
       return (
              <div>
                     <div className="flex w-[90%] flex-col gap-4 mx-auto my-5">
                            {/* row of img info */}
                            <div className="flex items-center gap-4 w-full">
                                   {/* img */}
                                   <div className="skeleton h-10 w-10 shrink-0 rounded-full"></div>
                                   {/* info */}
                                   <div className="flex flex-col gap-4 w-full">
                                          <div className="skeleton h-4 w-full"></div>
                                          <div className="skeleton h-4 w-full"></div>
                                   </div>
                            </div>
                            {/* for photo */}
                            <div className="skeleton h-32 w-[90%] ms-auto"></div>

                            {/* row for btns */}
                            <div className='flex justify-between w-[90%] mx-auto'>
                                   <div className='w-[25%]'>
                                          <div className="mx-auto skeleton h-7 w-7 px-7 py-2 rounded-full"></div>
                                   </div>
                                   <div className='w-[25%]'>
                                          <div className="mx-auto skeleton h-7 w-7 px-7 py-2 rounded-full"></div>
                                   </div>
                                   <div className='w-[25%]'>
                                          <div className="mx-auto skeleton h-7 w-7 px-7 py-2 rounded-full"></div>
                                   </div>
                                   <div className='w-[25%]'>
                                          <div className="mx-auto skeleton h-7 w-7 px-7 py-2 rounded-full"></div>
                                   </div>
                            </div>

                     </div>

                     {/* border bottom */}
                     <div className="w-full skeleton h-0.5 my-8"></div>
              </div>
       )
}

export default AllPostsSkelton