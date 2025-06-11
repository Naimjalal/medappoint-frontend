// pages/Appointment.jsx
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

const Appointment = ({ user }) => {
  const { doctorId } = useParams()
  const navigate = useNavigate()

  const initialState = {
    time: "",
  }

  const [formState, setFormState] = useState(initialState)
  const [doctor, setDoctor] = useState(null)

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/doctors/${doctorId}`)
        setDoctor(res.data)
      } catch (err) {
        console.error("Failed to fetch doctor", err)
      }
    }
    fetchDoctor()
  }, [])

  if (!user) {
    alert("Please log in to book an appointment")
    navigate("/register")
    return
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post(
        "http://localhost:3001/appointments",
        {
          ...formState,
          doctorId,
          hospitalId: doctor.hospitalId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer ".concat(localStorage.getItem("token")),
          },
        }
      )
      setFormState(initialState)
      navigate("/dashboard") 
    } catch (err) {
      console.error("Failed to create appointment", err)
    }
  }

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.id]: event.target.value })
  }

  if (!doctor) return <p>Loading doctor info...</p>

  return (
    <div className="Appointment">
      <h2>Book Appointment with Dr. {doctor.drName}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="time">Choose a date & time:</label>
        <input
          type="datetime-local"
          id="time"
          name="time"
          value={formState.time}
          onChange={handleChange}
          required
        />
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  )
}

export default Appointment
