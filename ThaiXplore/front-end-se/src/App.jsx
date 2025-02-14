import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home_page/home_page'
import ListPage from './pages/home_page/page_List'
import Detail from './pages/home_page/Detail'
import ProfilePage from './pages/profile_page/profile_page'
function App() {
  
  return (
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/ListPage/:title' element={<ListPage />}/>
      <Route path='/Detail/:title' element={<Detail />}/>
      <Route path='/profile' element={<ProfilePage />}/>

    </Routes>
  )
}

export default App
