import HappeningItem from "@/_modules/rightSidebar/HappeningItem"
import SearchWidget from "@/_modules/rightSidebar/SearchWidget"
import WhoToFollow from "@/_modules/rightSidebar/WhoToFollow"
import { Button } from "@chakra-ui/react"
import { faker } from "@faker-js/faker"

const RightSide = () => {
  return (
    <aside
    className="
    right--sidebar 
    hidden sticky top-0 overflow-y-auto
    border-l md:flex flex-col gap-3 #justify-between
    h-screen
    p-3 pt-0 #bg-red-50
    #basis-14 flex-[.3]
    basis-36
    "
    >
      <div className="sticky top-0 z-10">
      <header
      className="
      flex items-center #z-10
      bg-white
      h-12 border-b
      "
      >
        <SearchWidget/>
      </header>

      </div>

      <div
      className="
      
      flex flex-col gap-3
      "
      >
        {/* banner1 */}
        <div
        className="
        flex flex-col gap-2
        bg-slate-50 rounded-lg p-2
        "
        >
          <h2
          className="
          text-lg font-bold
          "
          >
            Subscribe to premium
          </h2>
          <p
          className="
          text-gray-500 text-sm 
          "
          >
          Subscribe to unlock new features and if eligible, receive a share of ads revenue.
          </p>
          <Button
          className="self-start"
          borderRadius={'9999px'}
          size={'sm'}
          colorScheme="blackAlpha"
          bg={'#333'}
          >
            Subscribe
          </Button>
        </div>

        {/* what's happening */}
        <div
        className="
        #sticky #top-0
        flex flex-col gap-2
        bg-slate-50 rounded-lg py-2
        "
        
        >
        <h2
          className="
          text-lg font-bold px-2
          "
          >
            What's happening
          </h2>

          <ul>
            {
              happenings?.length
              ?(
                happenings.map((el:any) => (
                  <HappeningItem
                  key={el.id}
                  item={el}
                  />
                ))
              ):''
            }
          </ul>

          <button
          className="
          text-left p-2 text-sm text-sky-500
          hover:bg-slate-100 transition-all
          "
          >
            Show more
          </button>
        </div>

        {/* who to follow */}
        <WhoToFollow/>
      </div>
    </aside>
  )
}

const happenings = Array.from({length: 5}).map((el:any) => {
  return {
    id: faker.string.uuid(),
    category: faker.lorem.words({min:1, max:1}),
    hashtag: faker.word.adjective({ length: { min: 5, max: 7 }, strategy: "fail" }),
    numOfTweets: faker.datatype.number({max: 3000}),
  };
});

export default RightSide