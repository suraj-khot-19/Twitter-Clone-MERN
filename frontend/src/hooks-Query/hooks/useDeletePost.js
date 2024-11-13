import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useDeletePost = (id) => {

       //query client
       const queryClient = useQueryClient();

       // handel delete
       const { mutate, isPending } = useMutation({
              mutationFn: async () => {
                     const url = `/api/v2/post/delete/${id}`
                     const res = await fetch(url, {
                            method: 'DELETE'
                     });

                     const jsonData = await res.json();

                     if (!res.ok) {
                            throw new Error(jsonData.msg || jsonData.error || 'Error is occured!')
                     }
                     return jsonData;
              },
              onSuccess: () => {
                     toast.success(`post deleted succesfully`)
                     queryClient.invalidateQueries({ queryKey: ['posts'] })
              },
              onError: (error) => {
                     toast.success(error)
              }
       })
       return { mutate, isPending }
}

export default useDeletePost