import './Donation.css'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Donation = ({ user }) => {
  const { hospitalId } = useParams()
  const initialState = {
    time: ''
  }
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      alert('Please register to apply for a donation')
      navigate('/register')
      return
    }
  }, [])
  const handleSubmit = async (event) => {
    event.preventDefault()
    await axios.post(
      'http://localhost:3001/donations',
      {
        ...formState,
        hospitalId,
        isDonated: false
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer '.concat(localStorage.getItem('token'))
        }
      }
    )
    setFormState(initialState)
    navigate('/dashboard')
  }
  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.id]: event.target.value })
  }

  const [formState, setFormState] = useState(initialState)
  return (
    <form onSubmit={handleSubmit} className="donation-form">
      <input
        type="date"
        id="time"
        name="time"
        value={formState.time}
        onChange={handleChange}
      />
      <button type="submit">Submit donation</button>
    </form>
  )
}

export default Donation
