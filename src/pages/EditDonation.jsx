import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
const EditDonation = () => {
  const { donationId } = useParams()
  const [formState, setFormState] = useState({})
  const navigate = useNavigate()
  useEffect(() => {
    const getDonation = async () => {
      const foundDonation = await axios.get(
        `http://localhost:3001/donations/${donationId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer ".concat(localStorage.getItem("token")),
          },
        }
      )
      setFormState(foundDonation.data)
    }

    getDonation()
  }, [])
  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.id]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await axios.put(
      `http://localhost:3001/donations/${donationId}`,
      formState,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(localStorage.getItem("token")),
        },
      }
    )
    navigate("/dashboard")
  }
  return (
    <div>
      {formState ? (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              id="time"
              type="date"
              value={formState.time}
              required
            />
            <button type="submit">Edit Donation</button>
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default EditDonation
