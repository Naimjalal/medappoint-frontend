import { useState, useEffect } from 'react'
import axios from 'axios'
import DonationCard from '../components/DonationCard'
import AppointmentCard from '../components/AppointmentCard' // <-- import AppointmentCard

const Dashboard = ({ user }) => {
  const [donations, setDonations] = useState([])
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    const getDonations = async () => {
      const foundDonations = await axios('http://localhost:3001/donations', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer '.concat(localStorage.getItem('token'))
        }
      })
      setDonations(foundDonations.data)
    }

    const getAppointments = async () => {
      const foundAppointments = await axios('http://localhost:3001/appointments', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer '.concat(localStorage.getItem('token'))
        }
      })
      setAppointments(foundAppointments.data)
    }

    getDonations()
    getAppointments()
  }, [])

  return (
    <div>
      <h2>Donations</h2>
      {donations.length > 0 ? (
        donations.map((donation) => (
          <DonationCard donation={donation} key={donation._id} />
        ))
      ) : (
        <p>No donations</p>
      )}

      <h2>Appointments</h2>
      {appointments.length > 0 ? (
        appointments.map((appointment) => (
          <AppointmentCard appointment={appointment} key={appointment._id} />
        ))
      ) : (
        <p>No appointments</p>
      )}
    </div>
  )
}

export default Dashboard
