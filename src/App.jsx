import { useState } from 'react'
import Nav from './components/Nav'
import { Route, Routes } from 'react-router'
import Register from './pages/Register'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Hospital from './pages/Hospital'
const App = () => {
  const [user,setUser] = useState(null)
  return (
    <div>
      <Nav  user={user} handleLogOut={()=> setUser(null)}/>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn setUser={setUser}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/hospitals/:hospitalId" element={<Hospital />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
