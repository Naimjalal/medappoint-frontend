import DoctorCard from './DoctorCard'
const DepartmentCard = ({ departmentName, departmentDoctors }) => {
  return (
    <div className="department-card">
      <h1>{departmentName}</h1>
      {departmentDoctors.map((doctor) => (
        <DoctorCard doctor={doctor} key={doctor._id} />
      ))}
    </div>
  )
}

export default DepartmentCard
