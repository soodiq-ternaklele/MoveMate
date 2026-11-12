// Komponen cuaca untuk Home: menampilkan hasil fetch External API.
// Pemuatan data memakai rantai .then() / .catch() / .finally().

import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { colors, common, styles } from "@/constants/styles";
import { getWeatherForCity } from "@/services/weatherService";
import { WeatherInfo } from "@/types/api";

export default function WeatherCard() {
  const [city, setCity] = useState("Malang");
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cekCuaca = (kota: string) => {
    setLoading(true);
    setError("");

    // .then(): jika Promise selesai dengan sukses, jalankan kode ini.
    // Nilai dari Promise (WeatherInfo) diteruskan ke parameter result.
    getWeatherForCity(kota)
      .then((result) => {
        setWeather(result);
      })
      .catch((err) => {
        // Dijalankan ketika Promise ditolak (reject/throw).
        setError(
          err instanceof Error ? err.message : "Gagal memuat data cuaca"
        );
      })
      .finally(() => {
        // Selalu dijalankan, sukses maupun gagal.
        setLoading(false);
      });
  };

  // Muat data pertama kali (default: Malang).
  useEffect(() => {
    cekCuaca("Malang");
  }, []);

  return (
    <View style={[common.card, { marginTop: 16 }]}>
      <View style={styles.between}>
        <Text style={styles.sectionTitle}>Cuaca Hari Pindahan</Text>
        <Ionicons name="partly-sunny" size={24} color={colors.primary} />
      </View>

      <View style={[styles.row, { gap: 10 }]}>
        <TextInput
          value={city}
          onChangeText={setCity}
          placeholder="Cari kota, mis. Malang"
          style={[common.input, { flex: 1, marginTop: 0 }]}
        />
        <Pressable
          style={[
            common.button,
            { paddingHorizontal: 20, paddingVertical: 13, opacity: loading ? 0.6 : 1 },
          ]}
          disabled={loading}
          onPress={() => cekCuaca(city)}
        >
          <Text style={common.buttonText}>Cek</Text>
        </Pressable>
      </View>

      {loading && (
        <View style={{ alignItems: "center", paddingVertical: 22 }}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.small}>Mengambil data cuaca...</Text>
        </View>
      )}

      {!loading && error !== "" && (
        <View
          style={{
            backgroundColor: "#FEF2F2",
            borderRadius: 12,
            padding: 14,
            marginTop: 12,
          }}
        >
          <Text style={{ color: colors.danger, fontWeight: "700" }}>
            ⚠️ {error}
          </Text>
        </View>
      )}

      {!loading && weather && (
        <View
          style={{
            backgroundColor: colors.softBlue,
            borderRadius: 14,
            padding: 16,
            marginTop: 12,
          }}
        >
          <View style={styles.row}>
            <Ionicons
              name={weather.icon as any}
              size={46}
              color={colors.primary}
            />
            <View style={{ marginLeft: 14, flex: 1 }}>
              <Text style={{ fontSize: 26, fontWeight: "900" }}>
                {weather.temperature}°C
              </Text>
              <Text style={{ fontWeight: "700", color: colors.primary }}>
                {weather.condition}
              </Text>
              <Text style={styles.small}>
                {weather.city}
                {weather.region ? `, ${weather.region}` : ""}
                {weather.country ? ` — ${weather.country}` : ""}
              </Text>
            </View>
          </View>

          <View style={[styles.row, { marginTop: 12, gap: 18 }]}>
            <Text style={styles.small}>💧 Kelembapan {weather.humidity}%</Text>
            <Text style={styles.small}>🌬 Angin {weather.windSpeed} km/j</Text>
          </View>

          <Text style={[styles.small, { marginTop: 10 }]}>
            Data langsung dari Open-Meteo (external API), bukan data statis.
          </Text>
        </View>
      )}
    </View>
  );
}
