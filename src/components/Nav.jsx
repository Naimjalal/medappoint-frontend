import { Link } from 'react-router-dom'
import './Nav.css'
const Nav = ({ user, handleLogOut }) => {
  return (
    <nav>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <span>Welcome, {user.email}</span>
          <button onClick={handleLogOut}>Log Out</button>
        </>
      ) : (
        <>
          <Link to="/register">Register</Link>
          <Link to="/signin">Sign In</Link>
        </>
      )}
    </nav>
  )
}

export default Nav
