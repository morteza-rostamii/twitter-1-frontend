import { Avatar, Button, IconButton, Image } from '@chakra-ui/react'
import { faker } from '@faker-js/faker';
import TextareaAutosize from 'react-textarea-autosize';
import { Tooltip } from '@chakra-ui/react'
import EmojiPicker from '../tweetBox/EmojiPicker';
import EmojiPop from '../tweetBox/EmojiPop';
import { useEffect, useRef, useState } from 'react';
import FileInputBtn from '../tweetBox/FileInputBtn';
import { HiXMark } from 'react-icons/hi2';
import useTweetStore from '@/_data/stores/tweet.store';
import useAuthStore from '@/_data/stores/auth.store';
import { resolve } from 'path';
import toast, { Toaster } from 'react-hot-toast';

const TopEditor = () => {
  const [tweetData, setTweetData] = useState({
    body: '',
    image: null,
  });
  // data url for showing image on the frontend.
  const [imageDataUrl, setImageDataUrl] = useState(null);

  const {createTweetAct, isLoading} = useTweetStore();
  const {authUser, } = useAuthStore();
  //const toast = useToast();

  // emoji--------
  const [activeEmoji, setActiveEmoji] = useState('');

  useEffect(() => {
    if (activeEmoji) {
      setTweetData((c:any) => ({
        ...c,
        body: c.body + activeEmoji,
      }));
    }
  }, [activeEmoji]);

  // file input-----------

  const imageInputRef = useRef(null);


  const handInputChange = (e:any) => {
    const name = e.target.name;

    if (name === 'body') {
      setTweetData((c:any) => ({
        ...c,
        body: e.target.value,
      }));
    }
    else if (name === 'image') {
      const file = e.target.files[0];

      if (file) {
        // set state with file data
        setTweetData((c:any) => ({
          ...c,
          image: file,
        }));

        // read image data url
        const reader = new FileReader();

        reader.onload = (e:any) => {
          setImageDataUrl(e.target.result);
        };

        // read
        reader.readAsDataURL(file);
      }
    }
  }

  const handClearImage = () => {
    if (!imageInputRef?.current) return;
    setImageDataUrl(null);
    // clear file input
    (imageInputRef.current as any).value = '';
  }

  const handTweetSubmit = async (e:any) => {
    e.preventDefault();

    if (
      !tweetData.body ||
      !authUser?.email 
    ) return;

    console.log(tweetData.body, tweetData.image);
    const outcome = await createTweetAct({
      body: tweetData.body,
      image: tweetData?.image,
      email: authUser.email,
    });

    setTweetData({
      body: '',
      image: null,
    });
    handClearImage();
  }

  return (
    <section
    className='
    flex gap-2
    border-b p-3
    '
    >
      <div
      className='

      '
      >
        <Avatar
        size={'sm'}
        />
      </div>
      
      <form
      className='
      flex flex-col gap-3
      flex-1 
      '
      onSubmit={handTweetSubmit}
      >
        <TextareaAutosize
        className='
        !outline-none w-full border-b 
        '
        name={'body'}
        value={tweetData.body}
        onChange={handInputChange}
        minRows={2}
        placeholder='What is happening?!'
        />

        {/* selected image */}
        {
          imageDataUrl
          ?(
            <div className='relative'>
              <Image
              className='
              w-full object-cover h-[300px] rounded-lg
              '
              style={{
                objectPosition: 'top',
              }}
              src={imageDataUrl}
              />
              <button
              type='button'
              className='
              absolute top-2 right-2
              bg-slate-50 rounded-full p-1
              hover:bg-slate-100 transition-all
              '
              onClick={() => handClearImage()}
              >
                <HiXMark size={18}/>
              </button>
            </div>
          ):''
        }

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
                actions.map((el:any) => {

                  if (el.type === 'file') {
                    return (
                      <FileInputBtn
                      key={el.id}
                      item={el}
                      imageInputRef={imageInputRef}
                      handSetImage={handInputChange}
                      />
                    )
                  }

                  if (el.type === 'pop') {
                    return (
                      <EmojiPop
                      key={el.id}
                      item={el}
                      activeEmoji={activeEmoji}
                      setActiveEmoji={setActiveEmoji}
                      />
                    )
                  }
                  else {
                    return (
                      <ActionItem
                      key={el.id}
                      item={el}
                      />
                    )
                  }
                })
              ):''
            }
          </ul>
          <Button
          className=''
          borderRadius={'9999px'}
          size={'sm'}
          colorScheme='twitter'
          type='submit'
          isLoading={isLoading}
          >
            Post
          </Button>
        </div>
        
      </form>

      {/* toast */}
      <Toaster/>
    </section>
  )
}

const ActionItem = ({item}:any) => {
  const Icon = <div className='w-4 fill-sky-500'>{item.icon}</div>
  return (
    <Tooltip 
    bg={'gray'}
    label={item.name}>
      <IconButton
      aria-label=''
      icon={Icon}
      isRound={true}
      size={'xs'}
      colorScheme='twitter'
      variant={'ghost'}
      />
    </Tooltip>
  )
}

const actions = [
  {
    id: faker.string.uuid(),
    name: 'media',
    icon: <svg viewBox="0 0 24 24" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-z80fyv r-19wmn03"><g><path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path></g></svg>,
    type: 'file',
  },
  {
    id: faker.string.uuid(),
    name: 'gif',
    icon: <svg viewBox="0 0 24 24" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-z80fyv r-19wmn03"><g><path d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172 1.02.43l1.03-.86c-.51-.601-1.28-.945-2.05-.945C7.19 9.25 6 10.453 6 12s1.19 2.75 2.72 2.75c.85 0 1.54-.344 2.05-.945v-2.149H8.38v1.032H9.4v.515c-.17.086-.42.172-.68.172-.76 0-1.36-.602-1.36-1.375 0-.688.6-1.375 1.36-1.375z"></path></g></svg>
  },
  {
    id: faker.string.uuid(),
    name: 'pol',
    icon: <svg viewBox="0 0 24 24" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-z80fyv r-19wmn03"><g><path d="M6 5c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zM2 7c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12V6h10v2zM6 15c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zm-4 2c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12v-2h10v2zM7 7c0 .552-.45 1-1 1s-1-.448-1-1 .45-1 1-1 1 .448 1 1z"></path></g></svg>
  },
  {
    id: faker.string.uuid(),
    name: 'emoji',
    icon: <svg viewBox="0 0 24 24" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-z80fyv r-19wmn03"><g><path d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z"></path></g></svg>,
    type: 'pop',
  },
  {
    id: faker.string.uuid(),
    name: 'location',
    icon:<svg viewBox="0 0 24 24" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-z80fyv r-19wmn03"><g><path d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z"></path></g></svg> 
  },
]

export default TopEditor