export default function ActivityLog({ logs, onClear }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-slate-800">📋 Log aktivitas</h3>
        <button onClick={onClear} className="text-xs text-slate-400 hover:text-slate-600">
          Hapus log
        </button>
      </div>
      <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
        {logs.length === 0 ? (
          <p className="text-center text-slate-400 text-sm py-8">Belum ada aktivitas.</p>
        ) : logs.map((l, i) => (
          <div key={i} className="flex items-start gap-2 sm:gap-3 bg-slate-50 rounded-lg px-3 py-2 text-sm flex-wrap sm:flex-nowrap">
            <span>{l.icon}</span>
            <span className="text-slate-400 text-[11px] sm:text-xs sm:min-w-[58px]">{l.time}</span>
            <span className="text-slate-700 flex-1 min-w-0">{l.text}</span>
            <span className="text-slate-400 text-[11px] sm:text-xs sm:ml-auto">{l.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
