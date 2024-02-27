import { Avatar, Button, } from "@chakra-ui/react"

const ToFollowItem = ({item}: any) => {
  return (
    <div
    className="
    flex gap-2 items-center w-full px-2 py-1 cursor-pointer
    hover:bg-slate-100 transition-all
    "
    >
      <div
      className="
      flex gap-2 items-center flex-1
      "
      >
        <Avatar 
        className=""
        src={item.image}
        size={'sm'}
        />

        <div>
          <h2
          className="text-sm font-bold"
          >
            {item.username}
          </h2>
          <p className="text-sm text-gray-400">
            @{item.username}
          </p>
        </div>

        <div
        className="ml-auto #bg-red-100"
        >
          <Button
          size={'xs'}
          borderRadius={'9999px'}
          colorScheme="blackAlpha"
          bg={'#333'}
          >
            Follow
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ToFollowItem