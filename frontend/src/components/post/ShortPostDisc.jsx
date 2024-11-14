import React from 'react'
import { userimg } from '../../utils/ImportsInOneFile'
import { formatPostDate } from '../../utils/FormatDataFun'
export default function ShortPostDisc({ user, post }) {
    return (
        <div className='flex flex-col gap-3'>
            <div className="flex gap-2">
                {/* img */}
                <div className="avatar">
                    <div className="w-9 h-9 rounded-full">
                        <img src={user.profileImg || userimg} alt="Profile" />
                    </div>
                </div>
                {/* info */}
                <div className='flex-col items-start justify-start'>
                    <div className='flex items-center gap-1 md:gap-0'>
                        <span className='text-base font-semibold'>{user.fullname}</span>
                        <span className='text-base text-stone-500 ms-2'><span className='me-1 text-white font-bold'>·</span>{formatPostDate(post?.createdAt)}</span>
                    </div>
                    <span className='text-base text-stone-500'>@{user.username}</span>
                </div>
            </div>
            <span className='font-semibold text-base'>{post?.title}</span>
            <span className='text-base text-stone-500 mx-3'>Replaying to <span className='text-blue-500'>@{user.username}</span></span>
        </div>
    )
}
