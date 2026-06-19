export default function ProgressRing({ label, percentage, statusClass }) {
  return (
    <div className="progress-ring-container">
      <div className={`ring ${statusClass}`}>{percentage}%</div>
      <div className={`ring-label ${statusClass}`}>{label}</div>
    </div>
  );
}
