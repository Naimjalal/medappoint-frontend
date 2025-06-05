import { useState } from 'react'
import axios from 'axios'

const Register = () => {
  const initialState = {
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    gender: '',
    bloodType: '',
    nationality: '',
    dateOfBirth: '',
    phone: '',
    allergies: ''
  }
  const [formState, setFormState] = useState(initialState)
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:3001/auth/register',
        formState
      )
      console.log('Registration successful:', response.data)
      setFormState(initialState)
    } catch (error) {
      console.error(
        'Registration failed:',
        error?.response?.data || error.message
      )
      alert(`Error: ${error?.response?.data || error.message}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
        value={formState.username}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={formState.email}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        value={formState.password}
      />
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        onChange={handleChange}
        value={formState.firstName}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        onChange={handleChange}
        value={formState.lastName}
      />

      <label htmlFor="gender">Gender: </label>
      <select
        id="gender"
        name="gender"
        onChange={handleChange}
        value={formState.gender}
      >
        <option value="" disabled>
          Select
        </option>
        <option value="Male">Male </option>
        <option value="Female">Female </option>
      </select>

      <label htmlFor="nationality">Nationality: </label>
      <select
        id="nationality"
        name="nationality"
        onChange={handleChange}
        value={formState.nationality}
      >
        <option value="" disabled>
          Select
        </option>
        <option value="Bahraini">Bahraini</option>
        <option value="Indian">Indian</option>
        <option value="American">American</option>
        <option value="Pakistani">Pakistani</option>
        <option value="Bangladesh">Bangladesh</option>
        <option value="Filipino">Filipino</option>
        <option value="Other">Other</option>
      </select>
      <label htmlFor="bloodType">Blood Type: </label>
      <select
        id="bloodType"
        name="bloodType"
        onChange={handleChange}
        value={formState.bloodType}
      >
        <option value="" disabled>
          Select
        </option>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
      </select>
      <label htmlFor="dateOfBirth">Date of Birth: </label>
      <input
        type="date"
        name="dateOfBirth"
        onChange={handleChange}
        value={formState.dateOfBirth}
      />
      <label htmlFor="phone">Phone: </label>
      <input
        type="tel"
        name="phone"
        placeholder="Enter your phone number"
        onChange={handleChange}
        value={formState.phone}
      />
      <label htmlFor="allergies">Allergies: </label>
      <input
        type="text"
        name="allergies"
        placeholder="E.g, nuts, pollen, none"
        onChange={handleChange}
        value={formState.allergies}
      />
      <button type="submit">Register</button>
    </form>
  )
}

export default Register
