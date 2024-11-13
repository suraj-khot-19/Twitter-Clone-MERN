import { useQuery } from '@tanstack/react-query';

const useUserProfile = (username) => {
    return useQuery({
        queryKey: ['userProfile', username],
        queryFn: async () => {
            try {
                const url = `/api/v2/user/profile/${username}`;
                const res = await fetch(url);
                const jsonData = await res.json();
                if (!res.ok) {
                    throw new Error(jsonData.msg || jsonData.error || 'Something went wrong on the backend!');
                }
                return jsonData;
            } catch (error) {
                throw new Error(error)
            }
        },
    });
};

export default useUserProfile;
