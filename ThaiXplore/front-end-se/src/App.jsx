import './App.css'
import { Route, Routes } from 'react-router-dom'

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
function App() {
  
  return (
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/ListPage/:title' element={<ListPage />}/>
      <Route path='/Detail/:id' element={<Detail />}/>
      <Route path='/profile' element={<ProfilePage />}/>
      <Route path='/profile/mainBusiness' element={<MainBusiness/>}/>
      <Route path='/profile/mainBusiness/createBusiness' element={<CreateBusiness/>}/>
      <Route path='/Detail/booking/:id/:index' element={<Booking />}/>
      <Route path='/Detail/:title/booking' element={<Booking />}/>
      <Route path='/profile/mainBusiness/createBusiness/addBusiness' element={<AddBusiness />}/>
      <Route path='/' element={<LoginPage />}/>
      <Route path='/signup' element={<SignupPage />}/>
      <Route path='/signup/role' element={<RolePage />}/>
      <Route path='/signup/finishsignup' element={<ThxPage />}/>
      
    </Routes>
  )
}

export default App
