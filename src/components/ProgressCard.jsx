export default function ProgressCard({ counter, target }) {
  const pct = target > 0 ? Math.min(100, Math.round((counter / target) * 100)) : 0;
  const isAlmost = pct >= 90 && pct < 100;
  const isDone   = pct >= 100;

  const barColor = isDone ? 'bg-green-500' : isAlmost ? 'bg-yellow-400' : 'bg-blue-500';
  const pctColor = isDone ? 'text-green-600' : isAlmost ? 'text-yellow-600' : 'text-blue-600';

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 mb-4">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-slate-800">Progress produksi</span>
        <span className={`text-xl font-bold ${pctColor}`}>{pct}%</span>
      </div>
      <div className="bg-slate-100 rounded-full h-3 overflow-hidden">
        <div
          className={`${barColor} h-full rounded-full transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-slate-400 mt-2">
        <span>0</span>
        <span>Target: {target}</span>
      </div>
    </div>
  );
}