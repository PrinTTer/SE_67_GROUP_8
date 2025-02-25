import './App.css'
import { Route, Routes } from 'react-router-dom'
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
    </Routes>
  )
}

export default App
