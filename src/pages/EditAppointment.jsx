import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const EditAppointment = ({ user }) => {
  const { appointmentId } = useParams()
  const [formState, setFormState] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      alert('Please register to book an appointment')
      navigate('/register')
      return
    }
    const getAppointment = async () => {
      const foundAppointment = await axios.get(
        `http://localhost:3001/appointments/${appointmentId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer '.concat(localStorage.getItem('token'))
          }
        }
      )
      setFormState(foundAppointment.data)
    }

    getAppointment()
  }, [])

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.id]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await axios.put(
      `http://localhost:3001/appointments/${appointmentId}`,
      formState,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer '.concat(localStorage.getItem('token'))
        }
      }
    )
    navigate('/dashboard')
  }

  return (
    <div>
      {formState ? (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              id="time"
              type="datetime-local"
              value={formState.time?.slice(0, 16)} // small trick to fit input format
              required
            />
            <button type="submit">Edit Appointment</button>
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default EditAppointment
