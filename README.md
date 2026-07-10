# 🧵 Sistem IoT Aktualisasi Produksi Mesin Narrow Fabric

Sistem monitoring produksi kain berbasis IoT yang menghitung panjang kain secara otomatis berdasarkan putaran roller mesin narrow fabric, menampilkan data secara realtime melalui LCD, indikator LED, dan dashboard web.

---

## 📋 Daftar Isi

- [Gambaran Umum](#gambaran-umum)
- [Arsitektur Sistem](#arsitektur-sistem)
- [Hardware](#hardware)
- [Cara Kerja](#cara-kerja)
- [Rumus Perhitungan](#rumus-perhitungan)
- [Firmware ESP8266](#firmware-esp8266)
- [Dashboard Web](#dashboard-web)
- [Firebase Realtime Database](#firebase-realtime-database)
- [Instalasi & Setup](#instalasi--setup)
- [Struktur Data Firebase](#struktur-data-firebase)
- [Logika LED Indikator](#logika-led-indikator)
- [Pengembangan Selanjutnya](#pengembangan-selanjutnya)

---

## Gambaran Umum

Alat ini dirancang untuk membantu operator mesin narrow fabric memantau hasil produksi secara otomatis tanpa perlu menghitung manual. Sensor IR mendeteksi strip putih pada roller, setiap deteksi dihitung sebagai satu putaran, lalu dikonversi menjadi panjang kain dalam satuan meter.

Data dikirim secara realtime ke Firebase dan dapat dipantau melalui dashboard web dari perangkat apapun yang terhubung ke internet.

---

## Arsitektur Sistem

```
[Mesin Narrow Fabric]
        │
  [Sensor IR] ──── mendeteksi strip putih pada roller
        │
  [ESP8266 (Wemos D1 Mini)]
        │
        ├── [LCD 16x2 I2C] ──── tampilan lokal
        ├── [LED Merah/Kuning/Hijau] ──── indikator status
        └── [WiFi] ──────────────────────────────────────┐
                                                         │
                                               [Firebase Realtime DB]
                                                         │
                                               [Dashboard Web React]
                                               (bisa dibuka dari HP/laptop)
```

---

## Hardware

| Komponen | Keterangan |
|---|---|
| ESP8266 (Wemos D1 Mini) | Mikrokontroler utama |
| LCD 16x2 I2C (0x27) | Tampilan counter & panjang kain |
| Sensor Proximity IR | Mendeteksi strip putih pada roller |
| Push Button | Reset counter |
| LED Merah | Indikator idle (counter = 0) |
| LED Kuning | Indikator mendekati target |
| LED Hijau | Indikator target tercapai |

### Konfigurasi Pin

| Pin ESP8266 | Fungsi |
|---|---|
| D1 (SCL) | LCD I2C Clock |
| D2 (SDA) | LCD I2C Data |
| D3 | LED Kuning |
| D4 | LED Hijau |
| D5 | Sensor IR Input |
| D6 | Push Button Reset |
| D7 | LED Merah |

---

## Cara Kerja

1. Sensor IR mendeteksi strip putih yang ditempel pada roller mesin.
2. Setiap kali strip terdeteksi, nilai counter bertambah 1.
3. Counter dikonversi menjadi panjang kain menggunakan rumus keliling roller.
4. Data ditampilkan secara lokal pada LCD 16x2.
5. LED menyala sesuai status produksi.
6. Setiap 5 detik, data dikirim ke Firebase Realtime Database.
7. Setiap 10 detik, ESP8266 membaca nilai target terbaru dari Firebase.
8. Dashboard web menampilkan data secara realtime dan memungkinkan operator mengubah target produksi dari jarak jauh.

---

## Rumus Perhitungan

```
Keliling Roller = π × Diameter

Panjang Kain (meter) = (Counter × π × Diameter) / 100
```

Konfigurasi saat ini:

```cpp
const float diameterCM = 4.0; // diameter roller dalam cm
```

Contoh: jika counter = 100 putaran, maka panjang kain = (100 × π × 4) / 100 = **12.57 meter**

---

## Firmware ESP8266

### Library yang Digunakan

| Library | Fungsi |
|---|---|
| `Wire.h` | Komunikasi I2C |
| `LiquidCrystal_I2C.h` | Kontrol LCD I2C |
| `ESP8266WiFi.h` | Koneksi WiFi |
| `FirebaseESP8266.h` | Komunikasi Firebase |

### File Utama

`Jumlah_Produksi_Firebase.ino`

### Konfigurasi Penting

```cpp
// WiFi
#define WIFI_SSID      "NAMA_WIFI"
#define WIFI_PASSWORD  "PASSWORD_WIFI"

// Firebase
#define FIREBASE_HOST  "xxxx-default-rtdb.asia-southeast1.firebasedatabase.app"
#define FIREBASE_AUTH  "SECRET_KEY"

// Roller
const float diameterCM = 4.0;

// Debounce sensor (sesuaikan dengan kecepatan mesin)
const int delayDetect = 10000; // 10 detik

// Interval kirim data ke Firebase
const int firebaseInterval = 5000; // 5 detik

// Interval baca target dari Firebase
const int targetReadInterval = 10000; // 10 detik
```

### Catatan Debounce

Nilai `delayDetect = 10000` (10 detik) disesuaikan dengan kecepatan putaran roller mesin. Jika kecepatan mesin berubah, nilai ini perlu disesuaikan agar tidak ada putaran yang terlewat atau terhitung ganda.

---

## Dashboard Web

Dashboard dibangun menggunakan **React + Vite + Tailwind CSS** dan terhubung langsung ke Firebase Realtime Database.

### Teknologi

| Teknologi | Versi | Fungsi |
|---|---|---|
| React | 18+ | Framework UI |
| Vite | 5+ | Build tool |
| Tailwind CSS | 4+ | Styling |
| Firebase JS SDK | 9+ | Koneksi database |
| Recharts | — | Grafik (opsional) |
| Lucide React | — | Icon |

### Struktur Folder

```
narrow-fabric-dashboard/
├── src/
│   ├── firebase.js              ← konfigurasi Firebase
│   ├── App.jsx                  ← komponen utama
│   ├── index.css                ← import Tailwind
│   └── components/
│       ├── StatusBanner.jsx     ← banner status produksi
│       ├── MetricCard.jsx       ← kartu metrik (counter, panjang, dll)
│       ├── ProgressCard.jsx     ← progress bar produksi
│       ├── SetTarget.jsx        ← input set target dari web
│       └── ActivityLog.jsx      ← log aktivitas realtime
├── vite.config.js
└── package.json
```

### Fitur Dashboard

- Tampilan status produksi realtime (Idle / Berjalan / Hampir Selesai / Selesai)
- Metrik counter, panjang kain, target, dan sisa putaran
- Progress bar produksi dengan persentase
- Set target produksi dari web (tanpa perlu upload ulang kode ESP8266)
- Log aktivitas otomatis (deteksi putaran, perubahan status, reset)
- Indikator koneksi Firebase

### Menjalankan Dashboard

```bash
# Masuk ke folder project
cd narrow-fabric-dashboard

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka browser di `http://localhost:5173`

### Build untuk Production

```bash
npm run build
```

Output akan ada di folder `dist/` dan bisa di-deploy ke Vercel, Netlify, atau hosting apapun.

---

## Firebase Realtime Database

### Setup

1. Buka [Firebase Console](https://console.firebase.google.com)
2. Buat project baru
3. Aktifkan **Realtime Database** → pilih region **Singapore**
4. Set mode keamanan ke **Test mode** untuk development
5. Daftarkan Web App untuk mendapatkan konfigurasi

### Struktur Data Firebase

```json
{
  "produksi": {
    "counter": 125,
    "panjang": 15.71,
    "target": 200,
    "status": "RUNNING"
  }
}
```

### Nilai Status

| Status | Kondisi |
|---|---|
| `IDLE` | Counter = 0, mesin belum mulai |
| `RUNNING` | Counter > 0 dan belum mendekati target |
| `ALMOST` | Counter >= target - 5 |
| `DONE` | Counter >= target |

---

## Instalasi & Setup

### 1. Setup Firebase

1. Buat project di [Firebase Console](https://console.firebase.google.com)
2. Aktifkan Realtime Database
3. Daftarkan Web App dan salin konfigurasi
4. Salin Database Secret dari Project Settings → Service Accounts

### 2. Upload Firmware ESP8266

1. Install Arduino IDE
2. Install board **ESP8266** via Boards Manager
3. Install library:
   - `LiquidCrystal_I2C` by Frank de Brabander
   - `Firebase ESP8266 Client` by Mobizt
4. Isi konfigurasi WiFi dan Firebase di kode
5. Upload ke board ESP8266

### 3. Setup Dashboard Web

1. Pastikan Node.js v18+ terinstall
2. Clone atau salin folder `narrow-fabric-dashboard`
3. Isi konfigurasi Firebase di `src/firebase.js`
4. Jalankan:

```bash
npm install
npm run dev
```

---

## Logika LED Indikator

| LED | Kondisi |
|---|---|
| 🔴 Merah | Counter = 0 (idle) |
| 🟡 Kuning | Counter >= target - 5 dan belum selesai |
| 🟢 Hijau | Counter >= target (selesai) |
| Semua mati | Counter > 0 dan belum mendekati target |

---

## Pengembangan Selanjutnya

- [ ] Histori produksi harian/mingguan tersimpan di Firebase
- [ ] Grafik tren produksi di dashboard
- [ ] Notifikasi saat target tercapai (email / WhatsApp)
- [ ] Migrasi ke ESP32 untuk performa lebih baik
- [ ] Multi-mesin monitoring dalam satu dashboard
- [ ] Autentikasi login untuk dashboard web
- [ ] Deploy dashboard ke Vercel / Netlify
- [ ] Aplikasi Android untuk monitoring mobile

---

## Catatan

Project ini dikembangkan sebagai sistem aktualisasi produksi berbasis IoT untuk mesin narrow fabric. Semua konfigurasi sensitif (API key, database secret, password WiFi) tidak boleh di-commit ke repository publik. Gunakan file `.env` untuk menyimpan konfigurasi rahasia.