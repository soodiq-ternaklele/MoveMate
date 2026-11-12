import { router } from "expo-router";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { common, colors, styles } from "@/constants/styles";
import { useOrders } from "@/context/OrderContext";
import { useAuth } from "@/context/AuthContext";

export default function Orders() {
  const { user } = useAuth();
  const { orders, loading } = useOrders();

  return (
    <ScrollView style={common.screen} contentContainerStyle={common.content}>
      <Text style={common.title}>Pesanan</Text>
      <Text style={common.subtitle}>
        Riwayat dan status pesanan untuk {user?.name || "akun Anda"}.
      </Text>

      {loading ? (
        <View style={{ marginTop: 40, alignItems: "center" }}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ marginTop: 12, color: colors.muted }}>Memuat daftar pesanan...</Text>
        </View>
      ) : orders.length === 0 ? (
        <View
          style={[
            common.card,
            { marginTop: 30, alignItems: "center", paddingVertical: 40, paddingHorizontal: 20 },
          ]}
        >
          <View
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              backgroundColor: colors.softBlue,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <Ionicons name="receipt-outline" size={36} color={colors.primary} />
          </View>
          <Text style={{ fontSize: 18, fontWeight: "900", color: "#0F172A" }}>
            Belum Ada Pesanan
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: colors.muted,
              marginTop: 6,
              marginBottom: 24,
              fontSize: 14,
            }}
          >
            Akun ini belum memiliki riwayat pemesanan. Yuk buat pesanan pindahan pertamamu!
          </Text>
          <Pressable
            style={[common.button, { width: "100%", paddingVertical: 14 }]}
            onPress={() => router.push("/pesan")}
          >
            <Text style={common.buttonText}>Pesan Sekarang</Text>
          </Pressable>
        </View>
      ) : (
        <View style={{ marginTop: 10 }}>
          {orders.map((o) => (
            <Pressable
              key={o.id}
              onPress={() =>
                router.push({
                  pathname: "/tracking",
                  params: { id: o.id },
                })
              }
              style={common.card}
            >
              <View style={styles.between}>
                <Text style={{ fontWeight: "900", fontSize: 16 }}>{o.id}</Text>
                <View
                  style={[
                    styles.chip,
                    o.status === "Selesai"
                      ? { backgroundColor: "#DCFCE7" }
                      : { backgroundColor: colors.softBlue },
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      o.status === "Selesai"
                        ? { color: "#16A34A" }
                        : { color: colors.primary },
                    ]}
                  >
                    {o.status}
                  </Text>
                </View>
              </View>
              <Text style={{ marginTop: 12, fontWeight: "700" }}>
                {o.route || `${o.pickup} → ${o.destination}`}
              </Text>
              <Text style={styles.small}>
                {o.date || o.schedule} • Armada {o.vehicle}
              </Text>
              <View style={[styles.between, { marginTop: 12 }]}>
                <Text style={styles.price}>
                  Rp{(o.price || o.total || 0).toLocaleString("id-ID")}
                </Text>
                <Text style={{ color: colors.primary, fontWeight: "800" }}>
                  {o.status === "Selesai" ? "Lihat Detail" : "Tracking →"}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
