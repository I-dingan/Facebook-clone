import React from 'react'
import InputBox from './InputBox'
import Posts from './Posts'
import Stories from './Stories'

function Feed() {
  return (
    <div className='flex-grow h-screen pb-44 pt-6 mr-4 xl:mr-40 overflow-y-auto'>
        <div className='mx-auto max-w-md md:max-w-lg'>
            {/* stories */}
            <Stories/>
            {/* inputbox */}
            <InputBox/>
            <Posts/>

        </div>
    </div>
  )
}

export default Feed