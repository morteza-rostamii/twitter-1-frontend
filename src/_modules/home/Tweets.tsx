import { faker } from "@faker-js/faker"
import TweetCard from "./TweetCard";
import { useEffect } from "react";
import useTweetStore from "@/_data/stores/tweet.store";
import { Spinner } from "@chakra-ui/react";
import useEffectOnce from "@/hooks/useEffectOnce";
import InfiniteScroll from 'react-infinite-scroll-component';

const Tweets = () => {
  const {tweets, getTweetsAct, page, limit, hasNext} = useTweetStore();

  useEffectOnce(() => {
    getTweetsAct({page, limit});

  });

  return (
    <ul 
    id="scrollableDiv"
    style={{
      overflow: 'hidden'
    }}
    className="w-full #bg-red-50">
      <InfiniteScroll
      className="!overflow-hidden"
      dataLength={tweets.length} //This is important field to render the next data
      next={() => getTweetsAct({page, limit})}
      hasMore={hasNext}
      loader={<></>}
      // loader={<Spinner 
      // color="blue.400"
      // size={'xl'}
      // />}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          
        </p>
      }
      
      >
        {
          tweets?.length
          ?(
            tweets.map((el:any,) => (
              <TweetCard
              key={el.id}
              item={el}
              />
            ))
          ):(
            <div 
            className="!pt-20 !mx-auto w-[100px] translate-x-[30px]"
            >
              <Spinner
              size={'xl'}
              color="blue.400"
              />
            </div>
          )
        }
      </InfiniteScroll>
    </ul>
  )
}
/*
const tweets = Array.from({length: 10}).map(() => {
  return {
    id: faker.string.uuid(),
    body: faker.lorem.words({min: 5, max: 20}),
    image: faker.image.urlLoremFlickr({category: 'fun'}),
     
    
    user: {
      id: faker.string.uuid(),
      username: faker.person.middleName(),
      image: faker.image.avatar(),
    },
  };
});
*/
export default Tweets