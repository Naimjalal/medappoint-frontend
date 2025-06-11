import DoctorCard from './DoctorCard'
const DepartmentCard = ({ departmentName, departmentDoctors }) => {
  return (
    <div className="department-card">
      <h1>{departmentName}</h1>
      <div className="doctors-container">
        {departmentDoctors.map((doctor) => (
          <DoctorCard doctor={doctor} key={doctor._id} />
        ))}
      </div>
    </div>
  )
}

export default DepartmentCard
