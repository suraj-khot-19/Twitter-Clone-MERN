import { useQuery } from "@tanstack/react-query";

const useAuthUser=()=>{
    return useQuery({  //data(The last successfully resolved data for the query) will be used as authUser
        queryKey: ['authUser'],
        queryFn: async () => {
          const url = '/api/v2/auth/me'
          try {
            const res = await fetch(url)
    
            //user
            const jsonData = await res.json();
    
            //if no query client then set null
            if (jsonData.error) return null;
    
            //if not
            if (!res.ok) throw new Error(jsonData.msg || "Not Authenticate user")
    
            //if all ok
            return jsonData;
          } catch (error) {
            throw new Error(error);
          }
        },
        retry: false //do not retry api request if user not found
      });
}
export default useAuthUser;