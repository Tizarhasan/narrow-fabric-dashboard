# Narrow Fabric Dashboard

Dashboard administratif sederhana untuk memonitor metrik dan aktivitas proyek berbasis React + Vite.

## Daftar Isi

- [Ikhtisar](#ikhtisar)
- [Fitur](#fitur)
- [Teknologi](#teknologi)
- [Persyaratan](#persyaratan)
- [Instalasi & Menjalankan](#instalasi--menjalankan)
- [Konfigurasi Firebase / Environment](#konfigurasi-firebase--environment)
- [Struktur Proyek](#struktur-proyek)
- [Script NPM](#script-npm)
- [Deployment](#deployment)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)
- [Kontak](#kontak)

## Ikhtisar

Proyek ini adalah dashboard front-end yang dibangun menggunakan Vite + React (JSX). Tujuannya menampilkan metrik, kemajuan, dan log aktivitas. Ada integrasi awal dengan Firebase melalui file [src/firebase.js](src/firebase.js).

## Fitur

- Tampilan metrik utama (kartu metrik)
- Komponen progress untuk target
- Activity log untuk pencatatan event
- Banner status dan set target
- Integrasi Firebase (konfigurasi di `src/firebase.js`)

## Teknologi

- React (JSX)
- Vite (build tooling)
- Firebase (opsional, untuk backend/auth/db)
- CSS sederhana (file `App.css`, `index.css`)

## Persyaratan

- Node.js 16+ direkomendasikan
- npm atau yarn / pnpm

## Instalasi & Menjalankan

1. Clone repositori ini:

```bash
git clone <repo-url>
cd narrow-fabric-dashboard
```

2. Pasang dependensi:

```bash
npm install
# atau
yarn
# atau
pnpm install
```

3. Jalankan server development:

```bash
npm run dev
```

4. Build untuk produksi:

```bash
npm run build

# untuk preview hasil build
npm run preview
```

## Konfigurasi Firebase / Environment

Project sudah menyertakan file `src/firebase.js` sebagai titik integrasi. Untuk menghubungkan Firebase Anda:

1. Buat project di Firebase Console dan tambahkan aplikasi web.
2. Salin konfigurasi Firebase (apiKey, authDomain, projectId, dsb.).
3. Simpan konfigurasi ke file environment atau langsung ke `src/firebase.js`.

Contoh menggunakan environment variables (`.env.local` di root):

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Lalu import variabel tersebut di `src/firebase.js`:

```js
// src/firebase.js
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
```

Catatan: Jangan commit file `.env.local` yang berisi secret ke repositori publik.

## Struktur Proyek

Berikut ringkasan struktur folder penting (root):

- `index.html` — berkas HTML utama
- `src/main.jsx` — entry React
- `src/App.jsx` — komponen root aplikasi
- `src/firebase.js` — integrasi/config Firebase
- `src/assets/` — aset gambar dan ikon
- `src/components/` — komponen UI utama
	- [src/components/ActivityLog.jsx](src/components/ActivityLog.jsx)
	- [src/components/MetricCard.jsx](src/components/MetricCard.jsx)
	- [src/components/ProgressCard.jsx](src/components/ProgressCard.jsx)
	- [src/components/SetTarget.jsx](src/components/SetTarget.jsx)
	- [src/components/StatusBanner.jsx](src/components/StatusBanner.jsx)

Deskripsi singkat komponen:
- `MetricCard.jsx` — menampilkan nilai metrik tunggal dengan styling.
- `ProgressCard.jsx` — menampilkan progress bar / target progress.
- `SetTarget.jsx` — UI untuk mengatur target atau ambang nilai.
- `ActivityLog.jsx` — daftar log aktivitas atau event.
- `StatusBanner.jsx` — banner status sistem atau pemberitahuan.

## Script NPM

- `npm run dev` — jalankan server development (Vite)
- `npm run build` — buat bundle produksi
- `npm run preview` — preview hasil build lokal

Periksa `package.json` untuk script tambahan.

## Deployment

Proyek ini dapat dideploy ke layanan hosting statis seperti Vercel, Netlify, atau Firebase Hosting.

Langkah singkat untuk Vercel/Netlify:

1. Push repositori ke GitHub/GitLab.
2. Buat project baru di Vercel/Netlify dan hubungkan repository.
3. Atur build command `npm run build` dan publish directory `dist`.
4. Tambahkan environment variables Firebase di dashboard provider (jika dipakai).

Untuk Firebase Hosting, ikuti dokumentasi resmi Firebase CLI.

## Kontak

Jika ada pertanyaan atau ingin berkolaborasi, hubungi pemilik repositori.

---
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
