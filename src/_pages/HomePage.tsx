import { AUTH_STATES } from "@/_data/const"
import useAuthStore from "@/_data/stores/auth.store"
import TopEditor from "@/_modules/home/TopEditor"
import Tweets from "@/_modules/home/Tweets"
import { IconButton, Skeleton } from "@chakra-ui/react"
import { HiArrowPath } from "react-icons/hi2"

const HomePage = () => {
  const {loadingAuth} = useAuthStore();
  
  return (
    <div
    className="
    mx-auto
    max-w-[508px]
    md:max-w-none
    sm:mx-0
    #bg-blue-100 "
    >
      <header
      className="
      sticky top-0 bg-white z-10
      flex items-center justify-between px-3 border-b
      #bg-red-50 h-12
      "
      >
        <Skeleton
        isLoaded={!(loadingAuth === AUTH_STATES.LOAD)}
        >
          {
            loadingAuth === AUTH_STATES.GUEST
            ?(
              <span>
                Home for Guest
              </span>
            ):(
              <span>
              Home for auth
              </span>
            )
          }
        </Skeleton>
        <IconButton
        aria-label=""
        icon={<HiArrowPath size={20}/>}
        //colorScheme=""
        isRound={true}
        size={'sm'}
        />
      </header>
      <TopEditor/>

      <Tweets/>
    
    </div>
  )
}

export default HomePage