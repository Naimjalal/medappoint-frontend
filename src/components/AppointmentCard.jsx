import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const AppointmentCard = ({ appointment }) => {
  const navigate = useNavigate()

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await axios.delete(
          `http://localhost:3001/appointments/${appointment._id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer '.concat(localStorage.getItem('token'))
            }
          }
        )
        alert('Appointment deleted successfully')
        navigate('/') // refresh the page after deletion
      } catch (err) {
        console.error(err)
        alert('Error deleting appointment')
      }
    }
  }

  return (
    <div className="appointment-card">
      <p>
        <strong>Date & Time:</strong>{' '}
        {new Date(appointment.time).toLocaleString()}
      </p>
      <p>
        <strong>Doctor:</strong> {appointment.doctorId?.drName}
      </p>
      <p>
        <strong>Hospital:</strong> {appointment.hospitalId?.name}
      </p>

      <div className="buttons">
        <Link to={`/editAppointment/${appointment._id}`}>
          <button>Edit Appointment</button>
        </Link>
        <button onClick={handleDelete} className="danger">
          Cancel Appointment
        </button>
      </div>
    </div>
  )
}

export default AppointmentCard
