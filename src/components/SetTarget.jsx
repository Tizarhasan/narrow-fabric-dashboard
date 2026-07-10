import { useState } from 'react';
import { ref, set } from 'firebase/database';
import { db } from '../firebase';

export default function SetTarget({ currentTarget }) {
  const [input, setInput] = useState('');
  const [msg, setMsg]     = useState(null);

  const handleSet = async () => {
    const val = parseInt(input);
    if (!val || val <= 0) {
      setMsg({ type: 'error', text: 'Masukkan angka target yang valid.' });
      return;
    }
    try {
      await set(ref(db, '/produksi/target'), val);
      setMsg({ type: 'success', text: `✅ Target ${val} putaran berhasil disimpan!` });
      setInput('');
    } catch (e) {
      setMsg({ type: 'error', text: 'Gagal menyimpan: ' + e.message });
    }
    setTimeout(() => setMsg(null), 4000);
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 mb-4">
      <h3 className="font-semibold text-slate-800 mb-3">⚙️ Set target produksi</h3>
      <div className="flex gap-2">
        <input
          type="number"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSet()}
          placeholder="Masukkan jumlah target putaran..."
          className="flex-1 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 outline-none focus:border-blue-400"
        />
        <button
          onClick={handleSet}
          className="bg-slate-800 text-white px-5 py-2 rounded-lg font-medium hover:bg-slate-700 transition"
        >
          Simpan
        </button>
      </div>
      <p className="text-xs text-slate-400 mt-2">
        Target aktif saat ini: <strong>{currentTarget}</strong> putaran. ESP8266 akan memperbarui dalam 10 detik.
      </p>
      {msg && (
        <div className={`mt-3 px-4 py-2 rounded-lg text-sm ${msg.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {msg.text}
        </div>
      )}
    </div>
  );
}