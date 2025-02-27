import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'

import SignupPage from './pages/singup_page/singup_page'
import RolePage from './pages/singup_page/role_page'
import ThxPage from './pages/singup_page/finishsignup_page'
import LoginPage from './pages/login_page/login_page'
import HomePage from './pages/home_page/home_page'
import ListPage from './pages/home_page/page_List'
import Detail from './pages/detail_page/Detail'
import ProfilePage from './pages/profile_page/profile_page'
import CreateBusiness from './pages/business_page/create_business'
import MainBusiness from './pages/business_page/main_business'
import Booking from './pages/booking_page/booking'
import AddBusiness from './pages/business_page/add_business'
import { NavigateBar } from './layouts/navigatebar'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPath } from './features/pathSlice'
function App() {

  const dispatch = useDispatch();
  const location = useLocation(); // ดึง path ปัจจุบันจาก react-router
  const currentPath = useSelector((state) => state.path.currentPath);

  // ใช้ useEffect เพื่อทำให้ Redux update path เมื่อ path เปลี่ยน
  useEffect(() => {
    dispatch(setPath(location.pathname));
  }, [location, dispatch]);
  
  console.log(currentPath);

  return (
    <>
      {
         currentPath === "/login" ? (
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/signup/role' element={<RolePage />} />
            <Route path='/signup/finishsignup' element={<ThxPage />} />
          </Routes>
        ) : <div className='flex flex-1 flex-col-reverse lg:flex-row'>
        <NavigateBar />
        <Routes>
          <Route path='/' element={<HomePage />} />

          <Route path='/listpage/:title' element={<ListPage />} />
          <Route path='/detail/:id' element={<Detail />} />

          <Route path='/profile' element={<ProfilePage />}>
            <Route index element={<ProfilePage />} />
            <Route path='mainbusiness' element={<MainBusiness />} />
            <Route path='mainbusiness/createbusiness' element={<CreateBusiness />} />
            <Route path='mainbusiness/createbusiness/addbusiness' element={<AddBusiness />} />
          </Route>

          <Route path='/detail/booking/:id/:index' element={<Booking />} />
          <Route path='/detail/:title/booking' element={<Booking />} />
        </Routes>
      </div>
      }
      {/* <div className='flex flex-1 flex-col-reverse lg:flex-row'>
        <NavigateBar />
        <Routes>
          <Route path='/' element={<HomePage />} />

          <Route path='/listpage/:title' element={<ListPage />} />
          <Route path='/detail/:id' element={<Detail />} />

          <Route path='/profile' element={<ProfilePage />}>
            <Route index element={<ProfilePage />} />
            <Route path='mainbusiness' element={<MainBusiness />} />
            <Route path='mainbusiness/createbusiness' element={<CreateBusiness />} />
            <Route path='mainbusiness/createbusiness/addbusiness' element={<AddBusiness />} />
          </Route>

          <Route path='/detail/booking/:id/:index' element={<Booking />} />
          <Route path='/detail/:title/booking' element={<Booking />} />
        </Routes>
      </div> */}
    </>
  )
}

export default App
