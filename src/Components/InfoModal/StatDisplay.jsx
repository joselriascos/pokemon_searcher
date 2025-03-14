export function StatDisplay({ label, value, barSize }) {
  return (
    <div className="stat-container">
      <p>{label}</p>
      <div className="stat-bar">
        <p>{value}</p>
        <div className="bar">
          <div className="fill" style={{ width: `${barSize}%` }}></div>
        </div>
      </div>
    </div>
  )
}
