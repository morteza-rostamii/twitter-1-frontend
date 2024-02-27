import { create } from 'zustand'

const useUserStore = create<any>((set:any, get:any) => ({
  auth: null,

  loginAct: () => {

  },
}))

const unsub = useUserStore.subscribe((state:any) => {
  console.log('useUserStore updated!', state);
})

export default useUserStore;