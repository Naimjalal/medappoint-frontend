import { useState } from 'react'
import Nav from './components/Nav'
import { Route, Routes } from 'react-router'
import Register from './pages/Register'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Hospital from './pages/Hospital'
import Donation from './pages/Donation'
import Dashboard from './pages/Dashboard'
import EditDonation from './pages/EditDonation'

const App = () => {
  const [user, setUser] = useState(null)
  return (
    <div>
      <Nav user={user} handleLogOut={() => setUser(null)} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/hospitals/:hospitalId"
            element={<Hospital user={user} />}
          />
          <Route
            path="/hospitals/:hospitalId/donation"
            element={<Donation user={user} />}
          />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/editDonation/:donationId" element={<EditDonation />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
