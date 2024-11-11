import React from 'react'
import userimg from '../assets/userimg.png'

function SoloUserFollowContainer(props) {
       return (
              <>
                     <div className="flex items-center justify-between w-full p-2 py-2">
                            {/* img and name */}
                            <div className="flex items-center cursor-pointer"> 
                                   {/* img */}
                                   <div className="avatar">
                                          <div className="w-11 h-11 rounded-full">
                                                 <img src={props.user.profileImg || userimg} alt="Profile" />
                                          </div>
                                   </div>

                                   {/* name and username */}
                                   <div className="ms-4 flex flex-col items-start justify-center">
                                          <span>{props.user.fullname}</span>
                                          <span>{props.user.username}</span>
                                   </div>
                            </div>

                            {/* follow button */}
                            <div className="flex items-center">
                                   <button className="bg-slate-200 text-black opacity-90 rounded-full px-5 py-1 hover:opacity-100">Follow</button>
                            </div>
                     </div>
              </>
       )
}

export default SoloUserFollowContainer