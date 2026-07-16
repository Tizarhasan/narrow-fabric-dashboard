import { useState } from 'react';
import { ref, set } from 'firebase/database';
import { db } from '../firebase';

const PRESETS = [
  { label: '5 detik',  value: 5000 },
  { label: '10 detik', value: 10000 },
  { label: '15 detik', value: 15000 },
  { label: '30 detik', value: 30000 },
];

export default function SetDelay({ currentDelay }) {
  const [input, setInput] = useState('');
  const [msg, setMsg]     = useState(null);

  const simpan = async (val) => {
    const v = parseInt(val);
    if (!v || v < 1000) {
      setMsg({ type: 'error', text: 'Minimal 1000ms (1 detik).' });
      setTimeout(() => setMsg(null), 3000);
      return;
    }
    try {
      await set(ref(db, '/produksi/delayDetect'), v);
      setMsg({ type: 'success', text: `✅ Delay ${v}ms (${v/1000} detik) berhasil disimpan!` });
      setInput('');
    } catch (e) {
      setMsg({ type: 'error', text: 'Gagal menyimpan: ' + e.message });
    }
    setTimeout(() => setMsg(null), 4000);
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 mb-4">
      <h3 className="font-semibold text-slate-800 mb-1">⏱️ Set delay sensor</h3>
      <p className="text-xs text-slate-400 mb-3">
        Delay aktif saat ini:{' '}
        <strong>
          {currentDelay
            ? `${currentDelay}ms (${currentDelay / 1000} detik)`
            : '—'}
        </strong>
      </p>

      <div className="flex gap-2 flex-wrap mb-3">
        {PRESETS.map(p => (
          <button
            key={p.value}
            onClick={() => simpan(p.value)}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 transition"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="number"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && simpan(input)}
          placeholder="Custom delay dalam ms (misal: 8000)"
          className="flex-1 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 outline-none focus:border-blue-400 text-sm"
        />
        <button
          onClick={() => simpan(input)}
          className="bg-slate-800 text-white px-5 py-2 rounded-lg font-medium hover:bg-slate-700 transition text-sm"
        >
          Simpan
        </button>
      </div>
      <p className="text-xs text-slate-400 mt-2">
        ESP8266 akan memperbarui dalam 10 detik. Minimal 1000ms.
      </p>
      {msg && (
        <div className={`mt-3 px-4 py-2 rounded-lg text-sm ${
          msg.type === 'success'
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
        }`}>
          {msg.text}
        </div>
      )}
    </div>
  );
}