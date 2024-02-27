import axios from 'axios'
import {TRegister, TLogin, TCreateTweet, TGetTweets} from '@/_data/types'
import toast from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_NODE_ENV === 'development' ? import.meta.env.VITE_API_DEV : import.meta.env.VITE_API_PRO;

const Axios = axios.create({
  withCredentials: true,
});

const Api = {

  // /api/auth------------------------------

  async register(formData: TRegister) {
    return await Axios.post(
      `${BASE_URL}/api/auth/register`,
      formData,
    );
  },

  async login(formData: TLogin) {
    return await Axios.post(
      `${BASE_URL}/api/auth/login`,
      formData,
    );
  },

  async checkAuth() {
    return await Axios.post(
      `${BASE_URL}/api/auth/check-auth`,
    );
  },

  // /api/users------------------------------

  async updateUser(id:string, formData: any) {
  
    return await Axios.put(
      `${BASE_URL}/api/users/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    );
  },

  // /api/tweets----------------------------

  async createTweet(payload: TCreateTweet) {
    const response = Axios.post(
      `${BASE_URL}/api/tweets`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    toast.promise(response, {
      loading: 'Please wait...',
      success: 'Tweet was sent.',
      error: 'Tweet has failed!',
    },{
      success: {
        duration: 8000,
      },
      error: {
        duration: 8000,
      },
    });
    return response;
  },

  async getTweets(payload: TGetTweets): Promise<any> {
    const {page, limit} = payload;
    return Axios.get(`${BASE_URL}/api/tweets?page=${page}&limit=${limit}`);
  }
}

export default Api;