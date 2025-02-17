import './App.css'
import { Route, Routes } from 'react-router-dom'

import SingupPage from './pages/singup_page/singup_page'
import LoginPage from './pages/login_page/login_page'
import ChatPage from './pages/chat_page/chat_page'

function App() {
  
  return (
    <Routes>
      <Route path='/' element={<LoginPage />}/>
      <Route path='/singup' element={<SingupPage />}/>
      <Route path='/chat' element={<ChatPage />}/>
    </Routes>
  )
}

export default App
