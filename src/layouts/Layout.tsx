import { Outlet } from "react-router"
import Sidebar from "./Sidebar"
import RightSide from "./RightSide"

const Layout = () => {
  return (
    <div
    className="
    flex #container mx-auto max-w-[1000px]
    "
    >
      <Sidebar/>
      <main className="flex-1 #max-w-[420px]">
      <Outlet/>
      </main>
      <RightSide/>
    </div>
  )
}

export default Layout