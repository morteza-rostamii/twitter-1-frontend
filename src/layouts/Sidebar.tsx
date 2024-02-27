import { AUTH_STATES } from "@/_data/const"
import useAuthStore from "@/_data/stores/auth.store"
import RegisterBtn from "@/_modules/auth/RegisterBtn"
import MainModal from "@/_modules/modals/MainModal"
import Dots3 from "@/icons/Dots3"
import Logo from "@/icons/Logo"
import PostIcon from "@/icons/PostIcon"
import { Avatar, Button, IconButton, Skeleton } from "@chakra-ui/react"
import { faker } from "@faker-js/faker"

const Sidebar = () => {
  const {loadingAuth, authUser} = useAuthStore(); 

  return (
    <aside
    className="
    hidden
    sm:flex flex-col justify-between whitespace-nowrap
    sticky top-0 bottom-0 h-screen
    border-r p-3 pt-0 #bg-slate-50
    basis-10
    lg:basis-36
    "
    >
      <div>
        <div
        className="
        h-12 flex items-center
        border-b 
        !self-start
        "
        >
          <button
          aria-label=""
          className="
          bg-sky-100 mb-3 #w-6 !m-0
          flex
          rounded-full p-2 transition-all
          hover:bg-slate-100 
          "
          >
            <span className="w-4">
            <Logo/>
            </span>
          </button>
        </div>

        <ul
        className="
        flex flex-col gap-3 #items-center #justify-center
        pt-1
        "
        >
          {
            navItems?.length
            ?(
              navItems.map((el:any) => (
                <NavItem
                key={el.id}
                item={el}
                />
              ))
            ):'loading'
          }
        </ul>
        
        <Skeleton
        isLoaded={!(loadingAuth === AUTH_STATES.LOAD)}
        >
          {
            loadingAuth === AUTH_STATES.AUTH
            ?(
              <MainModal
              Btn={<PostBtn/>}
              >
                some stuff
              </MainModal>
            ):(
              <RegisterBtn>
                <PostBtn/>
              </RegisterBtn>
            )
          }
        </Skeleton>

      </div>
      
      {/* profile */}
      <div
      className="
      !mt-auto 
      "
      >
        <button
        className="
        flex items-center justify-center gap-4 hover:bg-slate-100
        w-10 h-10 lg:w-full
        rounded-[9999px] py-6 px-3 transition-all
        "
        >
          <Avatar size={'sm'}/>
          <div 
          className="
          hidden lg:block
          text-left">
            <h2 className="text-xs font-semibold whitespace-nowrap">
              {authUser?.username}
            </h2>
            <p className="
            text-xs
            ">@{authUser?.username}</p>
          </div>
          <span className="hidden lg:block w-4"><Dots3/></span>
        </button>
      </div>
    </aside>
  )
}

const NavItem = ({item}:any) => {
  const active = 'Explore';

  return (
    <button
    className={`
    ${active === item.name ? '!text-sky-500' : '!text-gray-500'}
    flex #items-center #justify-items-center  lg:gap-2 #w-10 lg:w-full
    rounded-full lg:rounded-[9999px] p-2 transition-all
    hover:bg-slate-100 self-center
    `}
    >
      <span 
      className={`${active === item.name ? '!fill-sky-500': ''} !w-5 `}
      >
        {item.icon}
      </span>
      <span
      className="
      hidden
      lg:block
      "
      >
      {item.name}
      </span>
    </button>
  )
}

// open post modal
const PostBtn = ({
  onClick,
}:any) => {
  return (
    <button
    className="
    grid place-content-center
    mt-4 lg:w-full
    items-center justify-center gap-4 bg-sky-500 text-white 
    w-10 h-10 
    rounded-[9999px] py-4 #px-2 transition-all
    hover:bg-sky-600
    "
    onClick={onClick}
    >
      <span 
      className="
      block lg:hidden
      w-5 fill-white">
        <PostIcon/>
      </span>
      <span
      className="
      hidden lg:block
      "
      >
      Post
      </span>
    </button>
  )
}

export default Sidebar

const navItems = [
  {
    id: faker.string.uuid(),
    icon: <svg viewBox="0 0 24 24" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-18jsvk2 r-lwhw9o r-cnnz9e"><g><path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913H9.14c.51 0 .929-.41.929-.913v-7.075h3.909v7.075c0 .502.417.913.928.913h6.165c.511 0 .929-.41.929-.913V7.904c0-.301-.158-.584-.408-.758z"></path></g></svg>,
    name: 'Home',
    href: '/',
  },
  {
    id: faker.string.uuid(),
    icon: <svg viewBox="0 0 24 24" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-18jsvk2 r-lwhw9o r-cnnz9e"><g><path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path></g></svg>,
    name: 'Explore',
    href: '/explore',
  },
  {
    id: faker.string.uuid(),
    icon: <svg viewBox="0 0 24 24" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-18jsvk2 r-lwhw9o r-cnnz9e"><g><path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z"></path></g></svg>,
    name: 'Notification',
    href: '/notification',
  },
  {
    id: faker.string.uuid(),
    icon: <svg viewBox="0 0 24 24" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-18jsvk2 r-lwhw9o r-cnnz9e"><g><path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path></g></svg>,
    name: 'Messages',
    href: '/messages',
  },
  {
    id: faker.string.uuid(),
    icon: <svg viewBox="0 0 24 24" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-18jsvk2 r-lwhw9o r-cnnz9e"><g><path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z"></path></g></svg>,
    name: 'Notification',
    href: '/notification',
  },
  {
    id: faker.string.uuid(),
    icon: <svg viewBox="0 0 24 24" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-18jsvk2 r-lwhw9o r-cnnz9e"><g><path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5z"></path></g></svg>,
    name: 'Bookmarks',
    href: '/bookmarks',
  },
  {
    id: faker.string.uuid(),
    icon: <svg viewBox="0 0 24 24" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-18jsvk2 r-lwhw9o r-cnnz9e"><g><path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path></g></svg>,
    name: 'Profile',
    href: '/profile',
  },
  {
    id: faker.string.uuid(),
    icon: <svg viewBox="0 0 24 24" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-18jsvk2 r-lwhw9o r-cnnz9e"><g><path d="M3.75 12c0-4.56 3.69-8.25 8.25-8.25s8.25 3.69 8.25 8.25-3.69 8.25-8.25 8.25S3.75 16.56 3.75 12zM12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm-4.75 11.5c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25S6 11.31 6 12s.56 1.25 1.25 1.25zm9.5 0c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25-1.25.56-1.25 1.25.56 1.25 1.25 1.25zM13.25 12c0 .69-.56 1.25-1.25 1.25s-1.25-.56-1.25-1.25.56-1.25 1.25-1.25 1.25.56 1.25 1.25z"></path></g></svg>,
    name: 'More',
    //href: '/more',
    type: 'btn',
  },
]