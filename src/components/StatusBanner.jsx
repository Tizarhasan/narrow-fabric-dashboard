const statusMap = {
  IDLE:    { bg: 'bg-slate-100',  icon: '⏸️', label: 'Idle',           sub: 'Menunggu produksi dimulai' },
  RUNNING: { bg: 'bg-green-100',  icon: '🟢', label: 'Berjalan',       sub: 'Produksi sedang berlangsung' },
  ALMOST:  { bg: 'bg-yellow-100', icon: '⚠️', label: 'Hampir selesai', sub: 'Mendekati target produksi' },
  DONE:    { bg: 'bg-blue-100',   icon: '✅', label: 'Selesai',         sub: 'Target produksi tercapai!' },
};

export default function StatusBanner({ status }) {
  const s = statusMap[status] || statusMap.IDLE;
  return (
    <div className={`${s.bg} rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row gap-2 sm:gap-0 items-start sm:items-center justify-between mb-4`}>
      <div className="flex items-center gap-3">
        <span className="text-2xl">{s.icon}</span>
        <div>
          <div className="font-semibold text-slate-800 text-sm sm:text-base">{s.label}</div>
          <div className="text-xs sm:text-sm text-slate-500">{s.sub}</div>
        </div>
      </div>
    </div>
  );
}
