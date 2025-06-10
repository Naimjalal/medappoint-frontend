import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
const DonationCard = ({ donation }) => {
  const navigate = useNavigate()
  const deleteDonation = async () => {
    await axios.delete(`http://localhost:3001/donations/${donation._id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer '.concat(localStorage.getItem('token'))
      }
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    deleteDonation()
    navigate('/')
  }
  return (
    <div className="donation-card">
      {donation.time}
      <div>{donation.hospitalId.name}</div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Cancel Donation</button>
      </form>
      <Link to={`/editDonation/${donation._id}`}>
        <button>Edit Donation</button>
      </Link>
    </div>
  )
}

export default DonationCard
