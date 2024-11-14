import React from 'react'
import { Link } from 'react-router-dom';
import { userimg } from '../../utils/ImportsInOneFile';

export default function SinglePostCommentBox(props) {
    const { user, title } = props.comments;
    return (
        <div className='mx-auto border-b-2 border-b-stone-600 border-opacity-25 me-4'>
            <div className='flex flex-col gap-4'>
                <div>
                    <Link to={`/profile/${user?.username}`} className={`flex items-center justify-between w-full px-2 py-2 transition-all rounded-full duration-300`}>
                        {/* img and name */}
                        <div className="flex items-center cursor-pointer">
                            {/* img */}
                            <div className="avatar">
                                <div className="w-11 h-11 rounded-full">
                                    <img src={user?.profileImg || userimg} alt="Profile" />
                                </div>
                            </div>

                            {/* name and username */}
                            <div className="ms-4 flex flex-col items-start justify-center">
                                <span className="text-white font-extrabold">{user?.fullname}</span>
                                <span className="text-customGray text-sm">{user?.username}</span>
                                <span>{user?.bio}</span>
                            </div>
                        </div>
                    </Link>
                </div>
                <span className='text-white font-semibold ms-2 md:ms-5 pb-3 mb-5'>
                    {title}
                </span>
            </div>
        </div>
    )
}
