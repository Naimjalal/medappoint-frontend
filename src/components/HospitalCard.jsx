const HospitalCard = ({ hospital }) => {
  return (
    <div className="hospital-card">
      <h2>{hospital.name}</h2>
      <iframe src={hospital.location}></iframe>
    </div>
  )
}

export default HospitalCard
