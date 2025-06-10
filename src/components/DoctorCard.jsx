import { Link } from "react-router-dom"
const DoctorCard = ({ doctor }) => {
  return <div className="doctor-card">
    <Link to={`/appointment/${doctor._id}`}>{doctor.drName}</Link>
  </div>
}

export default DoctorCard
