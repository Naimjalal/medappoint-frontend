import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DepartmentCard from '../components/DepartmentCard'
import axios from 'axios'

const Hospital = () => {
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
  useEffect(() => {
    console.log(Array.from(Object.keys(departments)))
  }, [departments])
  return (
    <div className="departments-container">
      {departments ? (
        Array.from(Object.keys(departments)).map((department) => (
          <DepartmentCard
            departmentName={department}
            departmentDoctors={departments[department]}
          />
        ))
      ) : (
        // )
        <p>loading</p>
      )}
    </div>
  )
}

export default Hospital
