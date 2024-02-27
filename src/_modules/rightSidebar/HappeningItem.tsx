import { IconButton } from '@chakra-ui/react'
import { el } from '@faker-js/faker'
import React from 'react'
import { HiEllipsisHorizontal } from 'react-icons/hi2'

const HappeningItem = ({item}:any) => {
  return (
    <div
    className='
    flex p-2 cursor-pointer
    hover:bg-slate-100 transition-all
    '
    >
      <div>
        <p
        className='
        text-xs text-gray-400
        '
        >
          {item.category} . trending
        </p>
        <h2
        className='
        font-bold
        '
        >
          #{item.hashtag}
        </h2>
        <p 
        className='flex items-center text-xs text-gray-400'
        >
          {item.numOfTweets}<span>k posts</span>
        </p>
      </div>
      <div
      className='
      ml-auto
      '
      >
        <IconButton
        aria-label=''
        colorScheme='twitter'
        icon={<HiEllipsisHorizontal size={20}/>}
        variant={'ghost'}
        isRound={true}
        size={'sm'}
        />
      </div>
    </div>
  )
}

export default HappeningItem