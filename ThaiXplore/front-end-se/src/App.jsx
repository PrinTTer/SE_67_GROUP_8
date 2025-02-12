import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home_page/home_page'
import ListPage from './pages/home_page/page_List'
import Detail from './pages/home_page/Detail'
function App() {
  
  return (
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/ListPage/hotel' element={<ListPage />}/>
      <Route path='/Detail' element={<Detail />}/>
    </Routes>
  )
}

export default App
