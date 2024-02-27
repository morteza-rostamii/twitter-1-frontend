import { create } from 'zustand'
import { TCreateTweet, TGetTweets, TLogin, TRegister } from '../types';
import Api from '../routes';
import { AUTH_STATES } from '../const';
import toast from 'react-hot-toast';

type TuseTweetStore = {
  tweets: any,
  hasNext: boolean,
  page: number,
  limit: number,
  totalTweets: number,
  isLoading: boolean,
  getTweetsLoad: boolean,
  createTweetAct: any,
  getTweetsAct: any,
  getTweetAct: any,
}

const useTweetStore = create<TuseTweetStore>((set, get) => ({
  tweets: [],
  hasNext: true,
  page: 1,
  limit: 5,
  totalTweets: 0,
  isLoading: false,
  getTweetsLoad: false,

  createTweetAct: async (payload: TCreateTweet) => {
    try {
      set((c:any) => ({
        ...c,
        isLoading: true,
      }));
      const outcome = await Api.createTweet(payload);
        
      console.log(outcome)

      const data = outcome.data;
      if (data.status) {
        console.log(data.results.tweet);
        const tweet = data.results.tweet;
        set((c:any) => ({
          ...c, 
          tweets: [tweet, ...c.tweets],
        }));
      }
      else {
        throw new Error(data.message)
      }
      set((c:any) => ({
        ...c,
        isLoading: false,
      }));
      // return status for loading toast
      //return data.status;
    }
    catch(error:any) {
      console.log(error?.message || error);
      set((c:any) => ({
        ...c,
        isLoading: false,
      }));
      return false;
    }
  },

  getTweetsAct: async (payload: TGetTweets) => {

    // no next page
    if (!get().hasNext) return;

    try {
      set((c:any) => ({
        ...c,
        getTweetsLoad: true,
      }));
      const outcome = await Api.getTweets(payload);
        
      console.log(outcome)

      const data = outcome.data;
      if (data.status) {
        const tweets = data.results.tweets;
        set((c:any) => ({
          ...c, 
          tweets: [...c.tweets, ...tweets],
          hasNext: data.results.hasNext,
          // go to next page with each call
          page: c.page + 1,
          totalTweets: data.results.total,
        }));
      }
      else {
        throw new Error(data.message)
      }
      set((c:any) => ({
        ...c,
        getTweetsLoad: false,
      }));
      
    }
    catch(error:any) {
      console.log(error?.message || error);
      set((c:any) => ({
        ...c,
        getTweetsLoad: false,
      }));
      return false;
    }
  },
  
  getTweetAct: () => {},
  
}))

const unsub = useTweetStore.subscribe((state:any) => {
  console.log('useTweetStore updated!', state);
});

export default useTweetStore;