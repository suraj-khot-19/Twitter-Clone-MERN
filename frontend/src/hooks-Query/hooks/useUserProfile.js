import { useQuery } from '@tanstack/react-query';
import { fetchUserProfile } from '../queries/userQueries';

const useUserProfile = (username) => {
    return useQuery({
        queryKey: ['userProfile', username],
        queryFn: () => fetchUserProfile(username),
    });
};

export default useUserProfile;
