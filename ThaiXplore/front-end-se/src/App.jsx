import './App.css'
import { Route, Routes } from 'react-router-dom'

import SignupPage from './pages/singup_page/singup_page'
import RolePage from './pages/singup_page/role_page'
import ThxPage from './pages/singup_page/finishsignup_page'
import LoginPage from './pages/login_page/login_page'
import HomePage from './pages/home_page/home_page'

function App() {
  
  return (
    <Routes>
      <Route path='/' element={<LoginPage />}/>
      <Route path='/signup' element={<SignupPage />}/>
      <Route path='/signup/role' element={<RolePage />}/>
      <Route path='/signup/finishsignup' element={<ThxPage />}/>
      <Route path='/home' element={<HomePage />}/>
    </Routes>
  )
}

export default App
