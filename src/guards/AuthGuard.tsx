import { Outlet } from "react-router"

const AuthGuard = () => {
  return (
    <>
      <Outlet/>
    </>
  )
}

export default AuthGuard