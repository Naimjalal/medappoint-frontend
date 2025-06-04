import Nav from './components/Nav'
import { Route, Routes } from 'react-router'
import Register from './pages/Register'
import Home from './pages/Home'
import SignIn from './pages/SignIn'

const App = () => {
  return (
    <div>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
