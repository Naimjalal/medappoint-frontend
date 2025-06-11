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
      <p className="donation-time">
        <strong>Date: </strong>
        {new Date(donation.time).toLocaleString().split(',')[0]}
      </p>
      <p className="donation-hospital">
        <strong>Hospital: </strong>
        {donation.hospitalId.name}
      </p>
      <Link to={`/editDonation/${donation._id}`}>
        <button>Edit Donation</button>
      </Link>
      <form onSubmit={handleSubmit}>
        <button type="submit" className="danger">
          Cancel Donation
        </button>
      </form>
    </div>
  )
}

export default DonationCard
