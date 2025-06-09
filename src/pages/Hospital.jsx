import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import DepartmentCard from '../components/DepartmentCard'
import axios from 'axios'

const Hospital = ({ user }) => {
  const { hospitalId } = useParams()
  const [departments, setDepartments] = useState([])
  useEffect(() => {
    const getDepartments = async () => {
      const foundDepartments = await axios.get(
        `http://localhost:3001/hospitals/${hospitalId}`
      )
      setDepartments(foundDepartments.data)
    }
    getDepartments()
  }, [])
  return (
    <div className="hospital">
      {user ? (
        <Link to={`/hospitals/${hospitalId}/donation`}>
          <button>Donate</button>
        </Link>
      ) : null}
      <div className="departments-container">
        {departments ? (
          Array.from(Object.keys(departments)).map((department) => (
            <DepartmentCard
              departmentName={department}
              departmentDoctors={departments[department]}
            />
          ))
        ) : (
          <p>loading</p>
        )}
      </div>
    </div>
  )
}

export default Hospital
