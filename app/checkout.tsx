
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { common, colors, styles } from "@/constants/styles";
import { useOrders } from "@/context/OrderContext";
import { VehicleType } from "@/types";

export default function Checkout() {
  const p = useLocalSearchParams<{
    pickup: string;
    destination: string;
    vehicle: string;
    total: string;
    date: string;
    items: string;
  }>();

  const { addOrder } = useOrders();

  const [method, setMethod] = useState<"QRIS" | "Transfer">("QRIS");
  const [submitting, setSubmitting] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState("");

  // Mencegah klik ganda sebelum React selesai memperbarui state.
  const submittingRef = useRef(false);

  const total = Number(p.total || 0);

  const pay = async () => {
    if (submittingRef.current || createdOrderId) {
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);

    try {
      const created = await addOrder({
        pickup: p.pickup || "Lokasi Jemput",
        destination: p.destination || "Lokasi Tujuan",
        vehicle: (p.vehicle as VehicleType) || "Pickup",
        items: p.items,
        schedule: p.date || "Hari ini",
        total,
        payment: method,
      });

      if (!created?.id) {
        throw new Error("ID pesanan tidak ditemukan");
      }

      // Simpan ID agar tombol terkunci dan konfirmasi muncul.
      setCreatedOrderId(created.id);
    } catch (error) {
      console.error("Gagal membuat pesanan:", error);

      submittingRef.current = false;

      Alert.alert(
        "Pesanan gagal",
        "Pesanan belum berhasil disimpan. Silakan coba kembali."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // PENTING: useEffect berada di dalam Checkout,
  // tetapi di luar fungsi pay().
  useEffect(() => {
    if (!createdOrderId) {
      return;
    }

    const timer = setTimeout(() => {
      router.replace({
        pathname: "/tracking",
        params: { id: createdOrderId },
      });
    }, 1200);

    return () => clearTimeout(timer);
  }, [createdOrderId]);

  return (
    <ScrollView
      style={common.screen}
      contentContainerStyle={common.content}
    >
      <Pressable
        onPress={() => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace("/(tabs)/pesan");
          }
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "flex-start",
          paddingVertical: 10,
          marginBottom: 10,
        }}
      >
        <Ionicons
          name="arrow-back"
          size={22}
          color={colors.primary}
        />
        <Text
          style={{
            marginLeft: 8,
            color: colors.primary,
            fontWeight: "800",
          }}
        >
          Kembali
        </Text>
      </Pressable>

      <Text style={common.title}>Konfirmasi Pesanan</Text>
      <Text style={common.subtitle}>
        Periksa detail sebelum melakukan pembayaran.
      </Text>

      <View style={[common.card, { marginTop: 20 }]}>
        <Text style={styles.sectionTitle}>Detail pindahan</Text>

        <Text style={{ fontWeight: "700" }}>
          📍 {p.pickup || "-"}
        </Text>

        <Text style={{ fontWeight: "700", marginTop: 10 }}>
          🎯 {p.destination || "-"}
        </Text>

        <Text style={{ marginTop: 10 }}>
          🚚 {p.vehicle || "Armada"} • {p.items || 0} barang
        </Text>

        <Text style={{ marginTop: 10 }}>
          🗓 {p.date || "Sesuai Jadwal"}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Pilih pembayaran</Text>

      {(["QRIS", "Transfer"] as const).map((x) => (
        <Pressable
          key={x}
          disabled={submitting || Boolean(createdOrderId)}
          onPress={() => setMethod(x)}
          style={[
            common.card,
            styles.row,
            {
              borderColor:
                method === x ? colors.primary : colors.border,
              borderWidth: method === x ? 2 : 1,
              opacity: createdOrderId ? 0.7 : 1,
            },
          ]}
        >
          <Ionicons
            name={x === "QRIS" ? "qr-code-outline" : "card-outline"}
            size={28}
            color={colors.primary}
          />

          <View style={{ marginLeft: 13, flex: 1 }}>
            <Text style={{ fontWeight: "900" }}>{x}</Text>
            <Text style={styles.small}>
              {x === "QRIS"
                ? "Scan QRIS melalui e-wallet / mobile banking"
                : "Transfer ke rekening bank MoveMate"}
            </Text>
          </View>

          {method === x && (
            <Ionicons
              name="checkmark-circle"
              size={22}
              color={colors.primary}
            />
          )}
        </Pressable>
      ))}

      {method === "QRIS" && (
        <View style={[common.card, { alignItems: "center" }]}>
          <View
            style={{
              width: 170,
              height: 170,
              borderWidth: 8,
              borderColor: "#0F172A",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="qr-code"
              size={130}
              color="#0F172A"
            />
          </View>

          <Text style={{ marginTop: 12, fontWeight: "800" }}>
            QRIS DEMO MOVEMATE
          </Text>

          <Text style={styles.small}>
            Simulasi pembayaran untuk keperluan demo.
          </Text>
        </View>
      )}

      {method === "Transfer" && (
        <View style={common.card}>
          <Text style={{ fontWeight: "900" }}>
            Bank MoveMate (Demo)
          </Text>
          <Text style={{ marginTop: 8 }}>BCA • 1234567890</Text>
          <Text>a.n. PT MoveMate Indonesia</Text>
        </View>
      )}

      <View
        style={[
          common.card,
          {
            backgroundColor: colors.softGreen,
            marginTop: 12,
          },
        ]}
      >
        <View style={styles.between}>
          <Text style={{ fontWeight: "700" }}>
            Total pembayaran
          </Text>
          <Text style={[styles.price, { color: colors.success }]}>
            Rp{total.toLocaleString("id-ID")}
          </Text>
        </View>
      </View>

      {Boolean(createdOrderId) && (
        <View
          style={[
            common.card,
            {
              backgroundColor: colors.softGreen,
              alignItems: "center",
              padding: 24,
              marginTop: 12,
            },
          ]}
        >
          <Ionicons
            name="checkmark-circle"
            size={52}
            color={colors.success}
          />

          <Text
            style={{
              fontSize: 20,
              fontWeight: "900",
              marginTop: 12,
              color: colors.success,
            }}
          >
            Pesanan Berhasil!
          </Text>

          <Text style={{ marginTop: 8, textAlign: "center" }}>
            Nomor pesanan: {createdOrderId}
          </Text>

          <Text style={{ marginTop: 6, textAlign: "center" }}>
            Mengalihkan ke halaman pelacakan...
          </Text>

          <Pressable
            style={[
              common.button,
              { marginTop: 16, width: "100%" },
            ]}
            onPress={() =>
              router.replace({
                pathname: "/tracking",
                params: { id: createdOrderId },
              })
            }
          >
            <Text style={common.buttonText}>
              Lihat Pesanan Sekarang
            </Text>
          </Pressable>
        </View>
      )}

      <Pressable
        style={[
          common.button,
          {
            marginTop: 16,
            opacity:
              submitting || createdOrderId ? 0.6 : 1,
          },
        ]}
        disabled={submitting || Boolean(createdOrderId)}
        onPress={pay}
      >
        <Text style={common.buttonText}>
  {submitting ? "Memproses Pembayaran..." : "Bayar Sekarang"}
</Text>
      </Pressable>
    </ScrollView>
  );
}
