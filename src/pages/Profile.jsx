import { useEffect, useState } from 'react'
import axios from 'axios'

const Profile = ({ user }) => {
  console.log("Profile user prop:", user)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
     if (!user || !user.id) return
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token')
        
        const response = await axios.get(
          `http://localhost:3001/users/${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setProfile(response.data)
      } catch (err) {
        console.error('Error fetching profile:', err)
      }
    }

    if (user) {
      fetchProfile()
    }
  }, [user])

  if (!profile) return <h2>Loading profile...</h2>

  return (
    <div>
      <h2>My Profile</h2>
      <p>Username: {profile.username}</p>
      <p>
        Name:{profile.firstName}
        {profile.lastName}
      </p>
      <p>Gender: {profile.gender}</p>
      <p>Nationality: {profile.nationality}</p>
      <p>Phone: {profile.phone}</p>
    </div>
  )
}

export default Profile
