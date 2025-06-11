import { useEffect, useState } from 'react'
import axios from 'axios'
import "./Profile.css"

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
    <div className='profile-container'>
      <h2>My Profile</h2>
      {isEditing ? (
        <div className='profile-form'>
        <label>User Name: </label>
          <input
            name="username"
            value={formState.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <label>Blood Type: </label>
          <select
            name="bloodType"
            value={formState.blood}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          <label>Nationality:</label>
          <select
            name="nationality"
            value={formState.nationality}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Bahraini">Bahraini</option>
            <option value="Indian">Indian</option>
            <option value="Pakistani">Pakistani</option>
            <option value="Bangladeshi">Bangladeshi</option>
            <option value="Filipino">Filipino</option>
            <option value="American">American</option>
            <option value="Other">Other</option>
          </select>
          <label>Date of Birth: </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formState.dateOfBirth}
            onChange={handleChange}
          />
          <label>Phone: </label>
          <input
            name="phone"
            value={formState.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
          <label>Allergies: </label>
          <input
            name="allergies"
            value={formState.allergies}
            onChange={handleChange}
            placeholder="Allergies"
          />
          <div className='button-group'>
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
        </div>
        
      ) : (
        <div className='profile-info'>
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
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  )
}

export default Profile
