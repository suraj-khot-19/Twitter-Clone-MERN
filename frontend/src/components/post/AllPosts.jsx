import React from 'react'
import SinglePostWithProp from './SinglePostWithProp'
function AllPosts(props) {
  const post = {
    "_id": "672c6be0dacfcb57052077bc",
    "user": {
           "_id": "672331e547164cb57c43e931",
           "username": "rowdy",
           "fullname": "Rowdy Khot",
           "profileImg": "",
           "coverImg": "",
           "createdAt": "2024-10-31T07:29:41.224Z",
           "updatedAt": "2024-11-08T07:03:48.619Z",
           "liked": [
                  "672cacc59fc5e50704c9de6a",
                  "672c6be0dacfcb57052077bc"
           ]
    },
    "title": "my new post",
    "likes": [
           "672ca79ad138c88f53da3c90",
           "672331e547164cb57c43e931"
    ],
    "comments": [
           {
                  "title": "great post.",
                  "user": {
                         "_id": "672331e547164cb57c43e931",
                         "username": "rowdy",
                         "fullname": "Rowdy Khot",
                         "profileImg": "",
                         "createdAt": "2024-10-31T07:29:41.224Z",
                         "updatedAt": "2024-11-08T07:03:48.619Z",
                         "liked": [
                                "672cacc59fc5e50704c9de6a",
                                "672c6be0dacfcb57052077bc"
                         ]
                  },
                  "_id": "672c9f50f56afe785ce2e43c"
           }
    ],
    "img":'',
    "createdAt": "2024-11-07T07:27:28.119Z",
    "updatedAt": "2024-11-08T07:03:21.092Z",
}
  return (
    <div>
     <SinglePostWithProp post={post}/>
    </div>
  )
}

export default AllPosts