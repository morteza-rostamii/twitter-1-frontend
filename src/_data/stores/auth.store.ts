import { create } from 'zustand'
import { TLogin, TRegister } from '../types';
import Api from '../routes';
import { AUTH_STATES } from '../const';

type TUseAuthStore = {
  authUser: any,
  isLoading: boolean,
  loadingAuth: 'load' | 'auth' | 'guest',
  registerAct: any,
  loginAct: any,
  checkAuthAct: any,
}

const useAuthStore = create<TUseAuthStore>((set) => ({
  authUser: null,
  isLoading: false,
  // true until we check auth with the server.
  loadingAuth: 'load',

  registerAct: async (payload: TRegister) => {
    try {
      set((c:any) => ({
        ...c,
        isLoading: true,
      }));
      const outcome = await Api.register(payload);
      
      
      const data = outcome.data;
      if (data.status) {
        console.log(data.results.otp);  
      }
      else {
        throw new Error(data.message)
      }
      set((c:any) => ({
        ...c,
        isLoading: false,
      }));
    }
    catch(error:any) {
      console.log(error?.message || error);
      set((c:any) => ({
        ...c,
        isLoading: false,
      }));
    }
  },

  loginAct: async (payload: TLogin):Promise<any> => {
    try {
      set((c:any) => ({
        ...c,
        isLoading: true,
      }));
      const outcome = await Api.login(payload);
      
      const data = outcome.data;
      if (data.status) {
        console.log(data.results.user);  
        set((c:any) => ({
          ...c,
          authUser: data.results.user,
        }));

        // refresh homepage
        window.location.href = '/';
      }
      else {
        throw new Error(data.message);
      }
      set((c:any) => ({
        ...c,
        isLoading: false,
      }));
    }
    catch(error:any) {
      console.log(error?.message || error);
      set((c:any) => ({
        ...c,
        isLoading: false,
      }));
    }
  },

  checkAuthAct: async ():Promise<any> => {
    try {
      // set((c:any) => ({
      //   ...c,
      //   isLoading: true,
      // }));
      const outcome = await Api.checkAuth();
      
      const data = outcome.data;
      set((c:any) => ({
        ...c,
        authUser: data.results?.user,
      }));

      // set auth_state
      if (data.results?.user) {
        set((c:any) => ({
          ...c,
          loadingAuth: 'auth',
        }));
      }
      else {
        set((c:any) => ({
          ...c,
          loadingAuth: 'guest',
        }));
      }

      throw new Error(data.message);
      // set((c:any) => ({
      //   ...c,
      //   isLoading: false,
      // }));
    }
    catch(error:any) {
      console.log(error?.message || error);
      // set((c:any) => ({
      //   ...c,
      //   isLoading: false,
      // }));
    }
  },
}))

const unsub = useAuthStore.subscribe((state:any) => {
  console.log('useAuthStore updated!', state);
})

export default useAuthStore;