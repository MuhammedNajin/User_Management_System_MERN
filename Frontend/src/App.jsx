import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import Signup from './pages/user/Signup';
import Login from './pages/user/Login';
import Home from './pages/user/Home';
import Navbar from './components/navbar/Navbar';
import Profile from './pages/user/Profile';
import Protect from './components/ProtectRoute/Protect';
import ProtectLoginSignup from './components/ProtectRoute/ProtectLoginSignup';
import AdminHome from './pages/admin/AdminHome';
import AdminLogin from './pages/admin/Login';
import ProtectAdmin from './components/ProtectRoute/ProtectAdmin';
import ProtectAdminCredential from './components/ProtectRoute/ProtectAdminCredential';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Protect> <Home /> </Protect> }/>
          <Route path='/signup' element={ <ProtectLoginSignup> <Signup /> </ProtectLoginSignup>}/>
          <Route path='/login' element={ <ProtectLoginSignup> <Login /> </ProtectLoginSignup>}/>
          <Route path='/profile' element={<Protect> <Profile /> </Protect>}/>
          <Route path='/admin' element={<ProtectAdmin> <AdminHome /> </ProtectAdmin>}/>
          <Route path='/admin/login' element={ <ProtectAdminCredential> <AdminLogin /> </ProtectAdminCredential>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
