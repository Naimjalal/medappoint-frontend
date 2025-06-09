import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import DonationCard from '../components/DonationCard'
const Dashboard = ({ user }) => {
  const [donations, setDonations] = useState([])
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
    getDonations()
  }, [])
  return (
    <div>
      {donations ? (
        donations.map((donation) => <DonationCard donation={donation} />)
      ) : (
        <p>No donations</p>
      )}
    </div>
  )
}

export default Dashboard
