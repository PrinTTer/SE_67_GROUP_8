import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home_page/home_page'
import ChatPage from './pages/chat_page/chat_page'

function App() {
  
  return (
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/chat' element={<ChatPage />}/>
    </Routes>
  )
}

export default App
