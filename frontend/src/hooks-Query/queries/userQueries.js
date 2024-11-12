export const fetchUserProfile = async (username) => {
       const url = `/api/v2/user/profile/${username}`;
       const res = await fetch(url);
   
       const jsonData = await res.json();
       if (!res.ok) {
           throw new Error(jsonData.msg || jsonData.error || 'Something went wrong on the backend!');
       }
       return jsonData;
   };
   