import { HiMagnifyingGlass } from "react-icons/hi2"

const SearchWidget = () => {
  return (
    <form
    className="
    flex items-center w-full px-3 gap-2
    bg-slate-100 rounded-[9999px] overflow-hidden
    "
    >
      <HiMagnifyingGlass size={20}/>
      <input 
      className="
      h-8 outline-none border-none bg-transparent
      "
      type="search" 
      name="term" 
      id="term" 
      placeholder="Search"
      />
    </form>
  )
}

export default SearchWidget