import { useEffect, useState } from 'react'
import axios from 'axios'

const Profile = ({ user }) => {
  console.log('Profile user prop:', user)
  const [profile, setProfile] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formState, setFormState] = useState(null)

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
        setFormState(response.data)
      } catch (err) {
        console.error('Error fetching profile:', err)
      }
    }

    if (user) {
      fetchProfile()
    }
  }, [user])

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.put(
        `http://localhost:3001/users/${user.id}`,
        formState,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setProfile(response.data)
      setIsEditing(false)
    } catch (err) {
      console.error('Error updating profile:', err)
    }
  }

  if (!profile) return <h2>Loading profile...</h2>

  return (
    <div>
      <h2>My Profile</h2>
{isEditing ? (
        <>
          <input
            name="username"
            value={formState.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
      
      <p>Username: {profile.username}</p>
      <p>
        Name:{profile.firstName}
        {profile.lastName}
      </p>
      <p>Gender: {profile.gender}</p>
      <p>Blood Type: {profile.bloodType}</p>
      <p>Nationality: {profile.nationality}</p>
      <p>Date of Birth: {profile.dateOfBirth}</p>
      <p>Phone: {profile.phone}</p>
      <p>Allergies: {profile.allergies}</p>
      <button onClick= {()=> setIsEditing(true)}>Edit Profile</button>
       </>
      )}
    </div>
  )
}

export default Profile
