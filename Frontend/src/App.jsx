import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Start from "./pages/Start"
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainSingup from './pages/CaptainSingup'
import CaptainLogin from './pages/CaptainLogin'
import Home from "./pages/Home"
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/riding' element={<Riding/>}/>
        <Route path='/captain-riding' element={<CaptainRiding/>}/>
        <Route path='/signup' element={<UserSignup/>}/>
        <Route path='/captain-signup' element={<CaptainSingup/>}/>
        <Route path='/captain-login' element={<CaptainLogin/>}/>
        <Route path='/home' element={<UserProtectedWrapper>
          <Home />
        </UserProtectedWrapper>}/>
        <Route path="/user/logout" element={<UserProtectedWrapper>
          <UserLogout/>
        </UserProtectedWrapper>}/>
        <Route path="/captain-home" element={<CaptainProtectWrapper>
          <CaptainHome/>
        </CaptainProtectWrapper>}/>
        <Route path="/captain-logout" element={<CaptainProtectWrapper>
          <CaptainLogout/>
        </CaptainProtectWrapper>}/>
      </Routes>
    </div>
  )
}

export default App
