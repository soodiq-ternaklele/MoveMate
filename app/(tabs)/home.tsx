import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { common, colors, styles } from "@/constants/styles";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import { vehicles } from "@/data/mock";
import WeatherCard from "@/components/WeatherCard";

export default function Home() {
  const { user } = useAuth();
  const { orders } = useOrders();

  const activeOrder = orders.find((o) => o.status !== "Selesai");

  return (
    <ScrollView style={common.screen} contentContainerStyle={common.content}>
      <View style={styles.between}>
        <View>
          <Text style={{ color: colors.muted }}>Halo,</Text>
          <Text style={{ fontSize: 23, fontWeight: "900" }}>{user?.name || "Pengguna"} 👋</Text>
        </View>
        <Pressable onPress={() => router.push("/notifications")}>
          <Ionicons name="notifications-outline" size={27} color={colors.text} />
        </Pressable>
      </View>

      {/* Active Order Banner if any */}
      {activeOrder && (
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/tracking",
              params: { id: activeOrder.id },
            })
          }
          style={[
            common.card,
            {
              backgroundColor: colors.softBlue,
              borderColor: colors.primary,
              borderWidth: 1.5,
              marginTop: 16,
              marginBottom: 4,
            },
          ]}
        >
          <View style={styles.between}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="navigate-circle" size={24} color={colors.primary} />
              <Text style={{ fontWeight: "900", color: colors.primary, marginLeft: 8 }}>
                Pesanan Aktif ({activeOrder.id})
              </Text>
            </View>
            <View style={[styles.chip, { backgroundColor: "#FFF" }]}>
              <Text style={styles.chipText}>{activeOrder.status}</Text>
            </View>
          </View>
          <Text style={{ marginTop: 8, fontWeight: "700" }}>
            {activeOrder.route || `${activeOrder.pickup} → ${activeOrder.destination}`}
          </Text>
          <Text style={{ color: colors.primary, fontWeight: "800", marginTop: 6 }}>
            Pantau Perjalanan →
          </Text>
        </Pressable>
      )}

      <View style={{ backgroundColor: colors.primary, borderRadius: 22, padding: 20, marginTop: 16 }}>
        <Text style={{ color: "#DBEAFE", fontWeight: "700" }}>MOVE WITHOUT WORRY</Text>
        <Text style={{ color: "#FFF", fontSize: 25, fontWeight: "900", marginTop: 7 }}>
          Pindahan lebih mudah.
        </Text>
        <Text style={{ color: "#DBEAFE", marginTop: 5 }}>
          Pilih kendaraan, jadwal, dan lihat estimasi biaya.
        </Text>
        <Pressable
          onPress={() => router.push("/pesan")}
          style={{
            backgroundColor: "#FFF",
            borderRadius: 12,
            padding: 13,
            alignItems: "center",
            marginTop: 18,
          }}
        >
          <Text style={{ color: colors.primary, fontWeight: "900" }}>Pesan Sekarang</Text>
        </Pressable>
      </View>

      {/* Cuaca hari pindahan (fetch External API - Modul 3) */}
      <WeatherCard />

      <Text style={[styles.sectionTitle, { marginTop: 25 }]}>Layanan kendaraan</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
        {vehicles.map((v) => (
          <View key={v.id} style={[common.card, { width: "47%", marginBottom: 0 }]}>
            <Ionicons name={v.icon as any} size={30} color={colors.primary} />
            <Text style={{ fontWeight: "800", marginTop: 8 }}>{v.name}</Text>
            <Text style={styles.small}>{v.capacity}</Text>
            <Text style={[styles.price, { marginTop: 6 }]}>
              Mulai Rp{v.price.toLocaleString("id-ID")}
            </Text>
          </View>
        ))}
      </View>

      <Text style={[styles.sectionTitle, { marginTop: 25 }]}>Kenapa MoveMate?</Text>
      {[
        ["map-outline", "Pickup & tujuan jelas", "Tentukan lokasi dengan mudah."],
        ["cash-outline", "Harga transparan", "Lihat estimasi sebelum pesan."],
        ["shield-checkmark-outline", "Status real-time", "Pantau proses pindahan."],
      ].map(([icon, title, desc]) => (
        <View style={[common.card, styles.row]} key={title}>
          <View style={{ backgroundColor: colors.softBlue, padding: 12, borderRadius: 13 }}>
            <Ionicons name={icon as any} size={24} color={colors.primary} />
          </View>
          <View style={{ marginLeft: 13, flex: 1 }}>
            <Text style={{ fontWeight: "800" }}>{title}</Text>
            <Text style={styles.small}>{desc}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
