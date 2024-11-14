import { UserProfile, ProfileSkelton } from '../../utils/ImportsInOneFile'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useUserProfile from '../../hooks/useUserProfile';

export default function Profile() {
       //take from params
       const { username } = useParams();

       // from custom hook
       const { data: userProfile, isLoading, isError, error, refetch, isRefetching } = useUserProfile(username);

       //efffect
       useEffect(() => {
              refetch()
       }, [username, refetch])

       return (
              <>
                     {/* error */}
                     {
                            isError && <span className='text-center text-red-700 font-bold'>{error.message}</span>
                     }

                     {/* for loading */}
                     {
                            (isLoading || isRefetching) && (<ProfileSkelton />)
                     }

                     {/* if all ok */}
                     {
                            (!isLoading && !isError && !isRefetching && userProfile) && <UserProfile user={userProfile?.user} />
                     }
              </>
       )
}
