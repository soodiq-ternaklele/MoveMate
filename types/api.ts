// Interface untuk response mentah (raw JSON) dari External API Open-Meteo.
// Nama field disamakan dengan response server agar mapping-nya jelas.
// Dokumentasi: https://open-meteo.com/en/docs

// Hasil pencarian kota (geocoding)
export interface GeoResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  admin1?: string;
  country?: string;
}

export interface GeoResponse {
  results?: GeoResult[];
}

// Data cuaca saat ini dari API forecast
export interface CurrentWeather {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  weather_code: number;
  wind_speed_10m: number;
}

export interface ForecastResponse {
  current?: CurrentWeather;
}

// Object aplikasi: hasil mapping JSON dari External API
// dimasukkan ke dalam object yang mengikuti Interface ini.
export interface WeatherInfo {
  city: string;
  region: string;
  country: string;
  time: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  code: number;
  condition: string;
  icon: string;
}
