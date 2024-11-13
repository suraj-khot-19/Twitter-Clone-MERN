import React from 'react'

export const MyUnFollowButton = (props) => {
       return (
              <div>
                     <button className={`p-1 btn btn-outline btn-sm px-3 py-1 rounded-full hover:bg-red-600 border-red-500 hover:border-red-500 ${props?.className || ''}`} onClick={(e) => {
                            e.preventDefault();
                            props.onClick(e);
                     }}>Unfollow</button>
              </div>
       )
}

export const MyFollowButton = (props) => {
       return (
              <div>
                     <button className={`p-1  btn bg-white text-black btn-sm px-5 py-1 rounded-full hover:text-white hover:border-white ${props?.className || ''}`} onClick={(e) => {
                            e.preventDefault();
                            props.onClick(e);
                     }}>Follow</button>
              </div>
       )
}

export const MyLoading = (props) => {
       return (
              <div>
                     <div className='text-center mx-auto'>
                            <span className={`${props?.className || ''} loading loading-spinner loading-md`}></span>
                     </div>
              </div>
       )
}