import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Start from "./pages/Start"
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainSingup from './pages/CaptainSingup'
import CaptainLogin from './pages/CaptainLogin'
import Home from "./pages/Home"
import UserProtectedWrapper from './pages/UserProtectedWrapper'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/signup' element={<UserSignup/>}/>
        <Route path='/captain-signup' element={<CaptainSingup/>}/>
        <Route path='/captain-login' element={<CaptainLogin/>}/>
        <Route path='/home' element={<UserProtectedWrapper>
          <Home />
        </UserProtectedWrapper>}/>
      </Routes>
    </div>
  )
}

export default App
