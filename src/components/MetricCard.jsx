export default function MetricCard({ icon, label, value, unit }) {
  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200">
      <div className="text-sm text-slate-500 mb-2">{icon} {label}</div>
      <div className="text-3xl font-bold text-slate-800">{value}</div>
      <div className="text-xs text-slate-400 mt-1">{unit}</div>
    </div>
  );
}