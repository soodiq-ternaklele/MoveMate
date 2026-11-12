import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { common, colors, styles } from "@/constants/styles";
import { useOrders } from "@/context/OrderContext";

const steps = [
  ["Pembayaran Berhasil", "Pembayaran sudah diterima oleh sistem"],
  ["Driver Menuju Pickup", "Driver sedang menuju ke lokasi penjemputan"],
  ["Barang Diangkut", "Barang sudah dimuat ke dalam armada"],
  ["Dalam Perjalanan", "Driver sedang dalam perjalanan menuju tujuan"],
  ["Selesai", "Barang telah sampai di tujuan dengan selamat"],
];

const statusToIndex: Record<string, number> = {
  "Menunggu Pembayaran": 0,
  "Pembayaran Berhasil": 0,
  "Driver Menuju Pickup": 1,
  "Barang Diangkut": 2,
  "Dalam Perjalanan": 3,
  "Selesai": 4,
};

export default function Tracking() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { orders, getOrderById } = useOrders();

  const currentOrder = id ? getOrderById(id) : orders[0];
  const activeStep = currentOrder ? (statusToIndex[currentOrder.status] ?? 3) : 3;

  return (
    <ScrollView style={common.screen} contentContainerStyle={common.content}>
      <View style={styles.between}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={common.title}>Tracking</Text>
          <Text style={common.subtitle} numberOfLines={1}>
            {currentOrder ? `${currentOrder.id} • ${currentOrder.vehicle}` : "MM-001 • Pickup"}
          </Text>
        </View>
        <Ionicons name="navigate-circle" size={42} color={colors.primary} />
      </View>

      <View
        style={[
          common.card,
          {
            marginTop: 20,
            height: 190,
            backgroundColor: "#E0F2FE",
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Ionicons name="map" size={80} color={colors.primary} />
        <Text style={{ fontWeight: "900", marginTop: 8 }}>PEMANTAUAN REAL-TIME</Text>
        <Text style={styles.small}>
          {currentOrder?.route || "Perjalanan menuju lokasi tujuan"}
        </Text>
      </View>

      <Text style={[styles.sectionTitle, { marginTop: 22 }]}>Status Pesanan</Text>
      {steps.map((s, i) => {
        const isDone = i <= activeStep;
        return (
          <View key={s[0]} style={styles.row}>
            <View style={{ width: 38, alignItems: "center" }}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: isDone ? colors.primary : "#CBD5E1",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name={isDone ? "checkmark" : "ellipse-outline"}
                  size={17}
                  color="#FFF"
                />
              </View>
              {i < steps.length - 1 && (
                <View
                  style={{
                    height: 45,
                    width: 2,
                    backgroundColor: i < activeStep ? colors.primary : "#CBD5E1",
                  }}
                />
              )}
            </View>
            <View style={{ marginLeft: 10, paddingBottom: 20, flex: 1 }}>
              <Text style={{ fontWeight: "900", color: isDone ? "#0F172A" : "#94A3B8" }}>
                {s[0]}
              </Text>
              <Text style={styles.small}>{s[1]}</Text>
            </View>
          </View>
        );
      })}

      <Pressable
        style={common.button}
        onPress={() =>
          router.push({
            pathname: "/rating",
            params: { id: currentOrder?.id || "MM-001" },
          })
        }
      >
        <Text style={common.buttonText}>
          {currentOrder?.status === "Selesai" ? "Ubah Ulasan" : "Selesaikan & Beri Ulasan"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}
