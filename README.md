# MoveMate

Aplikasi tugas Pemrograman Mobile Modul 1–3 dengan tema jasa pindahan.

## Fitur demo
- Login/Register email atau nomor HP + password (local storage)
- Home/dashboard
- Pemesanan jasa pindahan
- Pickup & tujuan
- Pilihan kendaraan
- Input jumlah barang
- Estimasi biaya
- Jadwal
- Perbandingan kendaraan/harga
- QRIS/transfer bank (simulasi)
- Status pembayaran/pesanan
- Tracking pengiriman (simulasi)
- Notifikasi
- Riwayat pesanan
- Rating & ulasan

## Cara menjalankan
1. Pastikan Node.js dan Expo sudah siap.
2. Buka folder project di VS Code.
3. Jalankan:
   npm install
4. Jalankan:
   npx expo start --go
5. Scan QR dengan Expo Go.

## Catatan tugas
Versi ini sengaja menggunakan data lokal/simulasi agar dapat didemokan tanpa backend.
Map, QRIS, transfer, tracking, dan notifikasi belum terhubung ke layanan produksi.
Backend Firebase/Supabase, Google Maps, payment gateway, dan push notification dapat ditambahkan pada modul berikutnya.

## Penerapan materi Modul 1
- View, Text, TextInput, Pressable, ScrollView, FlatList-style data rendering
- StyleSheet external di constants/styles.ts
- Inline styling di beberapa komponen
- TypeScript type & interface
- Array of objects
- map() dan custom function
- Expo Router untuk screen/navigation
- @expo/vector-icons sebagai dependency

## Penerapan materi Modul 3 (Asynchronous & API Call)
- **External API + Interface**: `services/weatherService.ts` mengambil data dari API publik
  [Open-Meteo](https://open-meteo.com) (geocoding + forecast), lalu JSON-nya dimapping ke
  object ber-Interface `WeatherInfo` / `GeoResponse` / `ForecastResponse` di `types/api.ts`.
  Ditampilkan di Home melalui `components/WeatherCard.tsx` (fitur "Cuaca Hari Pindahan").
- **Custom async function**: `utils/delay.ts` membuat Promise sendiri dengan
  `new Promise((resolve) => setTimeout(resolve, ms))`; `getWeatherForCity()` adalah
  async function buatan sendiri.
- **Pre-built async function**: `fetch()` (HTTP request) dan `AsyncStorage.getItem/setItem`
  (AuthContext & OrderContext).
- **.resolve() dan .reject()**: `validateCity()` memakai `Promise.resolve()` saat kota valid
  dan `Promise.reject()` saat kosong/tidak ditemukan; error jaringan juga dikembalikan
  lewat `Promise.reject()`.
- **.then()**: `components/WeatherCard.tsx` memuat data dengan rantai
  `.then(result => ...)` → `.catch(err => ...)` → `.finally(...)`.
