import React, { useState } from 'react'
import CreatePost from './CreatePost';

function HomePosts() {
       //states
       const [selected, setSelected] = useState(1);

       console.log(selected)
       return (
              <div>
                     {/* for you / following btn */}
                     <div className='flex justify-between items-center px-auto w-full border-b border-slate-200 border-opacity-30'>
                            <div className={`w-[50%] px-auto py-4 text-center ${selected === 1 ? 'border-b-4 border-blue-500' : ''} transition-all duration-300 hover:bg-stone-700 cursor-pointer`} onClick={() => setSelected(1)}>
                                   <span className='font-bold'>For You</span>
                            </div>
                            <div className={`w-[50%] px-auto py-4 text-center ${selected === 2 ? 'border-b-4 border-blue-500' : ''} transition-all duration-300 hover:bg-stone-700 cursor-pointer`} onClick={() => setSelected(2)}>
                                   <span className='font-bold'>Following</span>
                            </div>
                     </div>

                     {/* self post */}
                     <CreatePost/>
              </div>
       )
}

export default HomePosts