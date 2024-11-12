import React from 'react'

function ProfileSkelton() {
       return (
              <div className='w-[95%] mx-auto my-3'>
                     <div className="flex flex-col gap-3">
                            {/* img and all */}
                            <div className="skeleton h-60 w-full"></div>

                            {/* info */}
                            <div className="flex flex-col gap-2">
                                   <div className="skeleton h-4 w-72"></div>
                                   <div className="skeleton h-4 w-72"></div>
                                   <div className="skeleton h-4 w-96"></div>
                                   <div className="skeleton h-4 w-96"></div>
                            </div>

                            {/* btns */}
                            <div className="flex justify-between items-center">
                                   <div className="skeleton h-9 w-24 rounded-full"></div>
                                   <div className="skeleton h-9 w-24 rounded-full"></div>
                                   <div className="skeleton h-9 w-24 rounded-full"></div>
                                   <div className="skeleton h-9 w-24 rounded-full"></div>
                            </div>
                            {/* posts */}
                            <div className="skeleton h-1 w-full"></div>
                            <div className="skeleton h-44 w-full"></div>
                            <div className="skeleton h-1 w-full"></div>
                            <div className="skeleton h-44 w-full"></div>
                     </div>
              </div>
       )
}

export default ProfileSkelton