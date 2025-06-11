import './Home.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import HospitalCard from '../components/HospitalCard'
import axios from 'axios'
const Home = () => {
  const [hospitals, setHospitals] = useState([])
  useEffect(() => {
    const getHospitals = async () => {
      const foundHospitals = await axios.get('http://localhost:3001/hospitals')
      setHospitals(foundHospitals.data)
    }
    getHospitals()
  }, [])
  return (
    <div>
      <h1>Welcome to Medappoint</h1>
      {hospitals ? (
        <div className="hospitals-container">
          {hospitals.map((hospital) => (
            <Link to={`hospitals/${hospital._id}`} key={hospital._id}>
              <HospitalCard hospital={hospital} />
            </Link>
          ))}
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  )
}

export default Home
