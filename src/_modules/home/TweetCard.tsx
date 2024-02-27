import CheckMark from '@/icons/CheckMark'
import LikeIco from '@/icons/tweetCard/LikeIco'
import ReplyIco from '@/icons/tweetCard/ReplyIco'
import RepostIco from '@/icons/tweetCard/RepostIco'
import ViewIco from '@/icons/tweetCard/ViewIco'
import { truncateText } from '@/utils/truncateTxt'
import { Avatar, Button, IconButton, Image, Skeleton } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'
import React from 'react'
import { HiEllipsisHorizontal, HiMiniArrowUpTray, HiOutlineBookmark } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

const TweetCard = ({item}:any) => {
  return (
    <div
    className='
    flex gap-2
    p-3
    '
    >
      <div>
        <Avatar
        src={item.user.image}
        />
      </div>
      <div
      className='
      flex-1
      '
      >
        <div
        className='
        flex flex-col gap-2
        '
        >
          <div
          className='
          flex items-center justify-between
          '
          >
            <div
            className='flex items-center gap-1'
            >
              <div className='flex items-center gap-1 '>
                <Link 
                to={'#'}
                className='font-bold text-sm hover:underline'>
                  {item.user.username}
                </Link>
                <span className='!w-4 !text-sm !fill-sky-500'>
                <CheckMark/>
                </span>
              </div>
              <Link 
              to={'#'}
              className='
              hover:underline
              text-sm 
              text-gray-500'>
                @{item.user.username}
              </Link>
            </div>
            <div
            className='
            #ml-auto
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
          <p>
            {truncateText(item.body, 60)}
          </p>

          <Skeleton
          isLoaded={item?.image}
          >
            <Image
            className='
            rounded-lg
            '
            src={item.image}
            />
          </Skeleton>

          {/* actions */}
          <div
          className='
          flex items-center justify-between
          '
          >
            <ul
            className='
            flex items-center gap-2
            '
            >
              {
                actions?.length
                ?(
                  actions.map((el:any) => (
                    <ActionItem
                    key={el.id}
                    item={el}
                    />
                  ))
                ): ''
              }
            </ul>

            <div
            className='
            flex items-center gap-1
            '
            >
              <IconButton
              aria-label=''
              icon={<HiOutlineBookmark size={18}/>}
              size={'sm'}
              isRound={true}
              variant={'ghost'}
              />
              <IconButton
              aria-label=''
              icon={<HiMiniArrowUpTray size={18}/>}
              size={'sm'}
              isRound={true}
              variant={'ghost'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ActionItem = ({item}:any) => {
  return (
    <button
    className={`
    ${item.name === 'Like' ? 'hover:text-red-500 hover:bg-red-100' : 'hover:text-sky-500 hover:bg-sky-100'}
    group
    text-sm flex items-center gap-1 text-gray-500
    #bg-sky-50 rounded-[9999px] p-1 px-2
     transition-all
    
    `}
    >
      <span 
      className={`
      ${item.name === 'Like' ? 'group-hover:fill-red-500' : 'group-hover:fill-sky-500'}
      w-4  
      `}
      >
        {item.icon}
      </span>
      <span>
        {item.count}
      </span>
    </button>
  )
}

const actions = [
  {
    id: faker.string.uuid(),
    name: 'Reply',
    count: faker.datatype.number({min: 10, max: 900}),
    icon: <ReplyIco/>
  },
  {
    id: faker.string.uuid(),
    name: 'Repost',
    count: faker.datatype.number({min: 10, max: 900}),
    icon: <RepostIco/>
  },
  {
    id: faker.string.uuid(),
    name: 'Like',
    count: faker.datatype.number({min: 10, max: 900}),
    icon: <LikeIco/>
  },
  {
    id: faker.string.uuid(),
    name: 'View',
    count: faker.datatype.number({min: 10, max: 900}),
    icon: <ViewIco/>
  },
];

export default TweetCard