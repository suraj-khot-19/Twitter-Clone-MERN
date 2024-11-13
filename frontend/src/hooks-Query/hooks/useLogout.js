import { useMutation, useQueryClient } from '@tanstack/react-query';

const useLogout = () => {
       //client
       const queryClient = useQueryClient();

       // logout fun
       const { mutate: loggingOut, isPending } = useMutation({
              mutationFn: async () => {
                     try {
                            const res = await fetch('/api/v2/auth/logout', {
                                   method: 'POST',
                                   headers: {
                                          'Content-Type': 'application/json'
                                   }
                            });

                            const jsonData = await res.json();

                            if (!res.ok) {
                                   throw new Error(jsonData.msg || "Failed to Logout")
                            }

                     } catch (error) {
                            throw new Error(error);
                     }
              },
              //on sucess
              onSuccess: () => {
                     //removing all queryes
                     queryClient.setQueryData(['authUser'], null);
              },
              //error
              onError: () => {
                     toast.error('Failed to Logout', { duration: 5000 })
              }
       })
       return {loggingOut, isPending}
}

export default useLogout