import { Navigate, Route, Routes } from "react-router"
import HomeLayout from "./_modules/home/layouts/HomeLayout"
import HomePage from "./_pages/HomePage"
import ProfilePage from "./_pages/ProfilePage"
import AuthGuard from "./guards/AuthGuard"
import Layout from "./layouts/Layout"
import useAuthStore from "./_data/stores/auth.store"
import { useEffect } from "react"

const AppRoutes = () => {
  // check for auth-----------
  const {checkAuthAct, } = useAuthStore();

  useEffect(() => {
    checkAuthAct();
  }, [checkAuthAct]);

  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/profile" element={<ProfilePage/>}>
      </Route>

      {/* protected */}
      <Route element={<AuthGuard/>}>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to='/'/>}/>
    </Routes>
  )
}

export default AppRoutes