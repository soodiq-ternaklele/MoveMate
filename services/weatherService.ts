// Service untuk mengambil data dari External API (Open-Meteo) dan
// memasukkannya ke dalam object yang mengikuti Interface WeatherInfo.
// Menggabungkan: fetch (pre-built async), delay (custom async),
// Promise.reject/resolve, dan mapping JSON -> Interface.

import { GeoResponse, ForecastResponse, WeatherInfo } from "@/types/api";
import { delay } from "@/utils/delay";

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

// Mapping kode cuaca (WMO) ke deskripsi bahasa Indonesia + ikon.
const WEATHER_CODES: Record<number, { label: string; icon: string }> = {
  0: { label: "Cerah", icon: "sunny" },
  1: { label: "Cerah Berawan", icon: "sunny-outline" },
  2: { label: "Berawan Sebagian", icon: "partly-sunny" },
  3: { label: "Berawan", icon: "cloudy" },
  45: { label: "Berkabut", icon: "cloudy" },
  48: { label: "Kabut Beku", icon: "cloudy" },
  51: { label: "Gerimis Ringan", icon: "rainy-outline" },
  53: { label: "Gerimis", icon: "rainy-outline" },
  55: { label: "Gerimis Lebat", icon: "rainy" },
  61: { label: "Hujan Ringan", icon: "rainy-outline" },
  63: { label: "Hujan", icon: "rainy" },
  65: { label: "Hujan Lebat", icon: "rainy" },
  80: { label: "Hujan Lokal Ringan", icon: "rainy-outline" },
  81: { label: "Hujan Lokal", icon: "rainy" },
  82: { label: "Hujan Lokal Lebat", icon: "rainy" },
  95: { label: "Badai Petir", icon: "thunderstorm" },
  96: { label: "Badai Petir + Hujan Es", icon: "thunderstorm" },
  99: { label: "Badai Petir Ekstrem", icon: "thunderstorm" },
};

function mapWeatherCode(code: number): { label: string; icon: string } {
  return WEATHER_CODES[code] ?? { label: "Kondisi tidak dikenal", icon: "help-outline" };
}

// Validasi input kota menggunakan Promise:
// .resolve() saat valid, .reject() saat tidak valid.
export function validateCity(city: string): Promise<string> {
  const clean = city.trim();

  if (!clean) {
    // reject() dipanggil ketika operasi gagal.
    return Promise.reject(new Error("Nama kota tidak boleh kosong"));
  }

  // resolve() dipanggil ketika operasi berhasil.
  return Promise.resolve(clean);
}

// Custom async function: mengambil data cuaca dari External API.
// fetch() adalah pre-built async function yang mengembalikan Promise.
export async function getWeatherForCity(city: string): Promise<WeatherInfo> {
  const clean = await validateCity(city);

  // 1. Cari koordinat kota (geocoding API).
  const geoRes = await fetch(
    `${GEO_URL}?name=${encodeURIComponent(clean)}&count=1&language=id&format=json`
  );

  if (!geoRes.ok) {
    return Promise.reject(
      new Error(`Gagal mencari kota (HTTP ${geoRes.status})`)
    );
  }

  const geoJson = (await geoRes.json()) as GeoResponse;
  const geo = geoJson.results?.[0];

  if (!geo) {
    return Promise.reject(new Error(`Kota "${clean}" tidak ditemukan`));
  }

  // 2. Ambil data cuaca berdasarkan koordinat kota (forecast API).
  const forecastRes = await fetch(
    `${FORECAST_URL}?latitude=${geo.latitude}&longitude=${geo.longitude}` +
      `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m` +
      `&timezone=auto`
  );

  if (!forecastRes.ok) {
    return Promise.reject(
      new Error(`Gagal mengambil data cuaca (HTTP ${forecastRes.status})`)
    );
  }

  const forecastJson = (await forecastRes.json()) as ForecastResponse;
  const current = forecastJson.current;

  if (!current) {
    return Promise.reject(new Error("Data cuaca tidak tersedia"));
  }

  // Jeda singkat agar state loading sempat terlihat (custom async function).
  await delay(400);

  // 3. Mapping JSON dari API ke dalam object ber-Interface WeatherInfo.
  const info: WeatherInfo = {
    city: geo.name,
    region: geo.admin1 ?? "",
    country: geo.country ?? "",
    time: current.time,
    temperature: Math.round(current.temperature_2m),
    humidity: current.relative_humidity_2m,
    windSpeed: current.wind_speed_10m,
    code: current.weather_code,
    condition: mapWeatherCode(current.weather_code).label,
    icon: mapWeatherCode(current.weather_code).icon,
  };

  return info;
}
