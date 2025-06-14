 import "./SignIn.css"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
const SignIn = ({setUser}) => {
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormState({...formState,[e.target.name]: e.target.value})
  }
  const handleSubmit = async(e) =>{
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:3001/auth/login",formState)
      localStorage.setItem("token", response.data.token)
      setUser(response.data.user)
      setFormState({email: "", password:""})
      console.log("Login Successful")
      navigate("/")
    } catch (error) {
      console.error("Login failed",error.response?.data || error.message)
      alert("Invalid email or password")
    }
  }

  return (
    <div className="signin-container">
    <form onSubmit={handleSubmit}>
      <h2>Sign In </h2>
      <input
      type = "email"
      name='email'
      placeholder='Email'
      value={formState.email}
      onChange={handleChange}
      />
      <input
      type='password'
      name="password"
      placeholder='Password'
      value={formState.password}
      onChange={handleChange}
      />
      <button type='submit'>Login</button>
    </form>
    </div>
  )
}

export default SignIn
