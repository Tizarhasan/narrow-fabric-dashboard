import { useEffect, useState, useRef } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from './firebase';

import StatusBanner  from './components/StatusBanner';
import MetricCard    from './components/MetricCard';
import ProgressCard  from './components/ProgressCard';
import SetTarget     from './components/SetTarget';
import SetDelay      from './components/SetDelay';
import ActivityLog   from './components/ActivityLog';

function nowTime() {
  return new Date().toLocaleTimeString('id-ID', {
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
}

export default function App() {
  const [data, setData] = useState({
    counter: 0, panjang: 0,
    target: 0, status: 'IDLE',
    delayDetect: 10000
  });
  const [logs, setLogs]             = useState([]);
  const [connected, setConnected]   = useState(false);
  const [lastUpdate, setLastUpdate] = useState('—');

  const lastCounterRef = useRef(null);
  const lastStatusRef  = useRef(null);

  function addLog(icon, text, val) {
    setLogs(prev => [{ time: nowTime(), icon, text, val }, ...prev].slice(0, 100));
  }

  useEffect(() => {
    const produksiRef = ref(db, '/produksi');
    const unsub = onValue(produksiRef, snap => {
      const d = snap.val();
      if (!d) return;

      const counter = d.counter ?? 0;
      const status  = (d.status ?? 'IDLE').toUpperCase();

      if (lastCounterRef.current !== null && counter !== lastCounterRef.current) {
        if (counter === 0) {
          addLog('🔄', 'Counter direset', '0 putaran');
        } else if (counter > lastCounterRef.current) {
          addLog('🔁', 'Putaran terdeteksi', `${counter} / ${d.target}`);
        }
      }

      if (lastStatusRef.current !== null && status !== lastStatusRef.current) {
        if (status === 'DONE')    addLog('✅', 'Target tercapai!',      `${parseFloat(d.panjang).toFixed(2)} m`);
        if (status === 'ALMOST')  addLog('⚠️', 'Mendekati target',      `${counter} / ${d.target}`);
        if (status === 'RUNNING') addLog('▶️', 'Produksi dimulai',      '');
        if (status === 'IDLE')    addLog('⏸️', 'Produksi berhenti',     '');
      }

      lastCounterRef.current = counter;
      lastStatusRef.current  = status;

      setData({ ...d, status });
      setConnected(true);
      setLastUpdate(nowTime());

    }, () => setConnected(false));

    return () => unsub();
  }, []);

  const sisa = data.target > 0 ? Math.max(0, data.target - data.counter) : '—';

  return (
    <div className="min-h-screen bg-slate-100">

      {/* HEADER */}
      <div className="bg-slate-800 text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">🧵 Monitoring Produksi Narrow Fabric</h1>
          <p className="text-xs text-slate-400 mt-0.5">Dashboard realtime berbasis IoT</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-full text-xs text-slate-400">
          <span className={`w-2 h-2 rounded-full ${connected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
          {connected ? `Terhubung · ${lastUpdate}` : 'Tidak terhubung'}
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto px-4 py-6">

        <StatusBanner status={data.status} />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <MetricCard icon="🔄" label="Counter"      value={data.counter}                         unit="putaran roller" />
          <MetricCard icon="📏" label="Panjang kain" value={parseFloat(data.panjang).toFixed(2)}  unit="meter" />
          <MetricCard icon="🎯" label="Target"       value={data.target > 0 ? data.target : '—'}  unit="putaran" />
          <MetricCard icon="⏳" label="Sisa"         value={sisa}                                  unit="putaran lagi" />
        </div>

        <ProgressCard counter={data.counter} target={data.target} />

        <SetDelay currentDelay={data.delayDetect} />

        <SetTarget currentTarget={data.target} />

        <ActivityLog logs={logs} onClear={() => setLogs([])} />

      </div>
    </div>
  );
}