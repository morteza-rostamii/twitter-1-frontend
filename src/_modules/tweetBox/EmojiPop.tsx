import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  IconButton,
} from '@chakra-ui/react'
import EmojiPicker from './EmojiPicker';

const EmojiPop = ({
  item,
  activeEmoji,
  setActiveEmoji,
}:any) => {
  const Icon = <div className='w-4 fill-sky-500'>{item.icon}</div>;

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
        aria-label=''
        icon={Icon}
        isRound={true}
        size={'xs'}
        colorScheme='twitter'
        variant={'ghost'}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        {/* <PopoverCloseButton />
        <PopoverHeader>Confirmation!</PopoverHeader> */}
        <PopoverBody>
          <EmojiPicker
          activeEmoji={activeEmoji}
          setActiveEmoji={setActiveEmoji}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default EmojiPop;