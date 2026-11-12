
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "@/components/BottomNav";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { common, colors, styles } from "@/constants/styles";
import { useOrders } from "@/context/OrderContext";

export default function Rating() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { updateOrderStatus, getOrderById } = useOrders();

  const currentOrder = id ? getOrderById(id) : undefined;

  const [rating, setRating] = useState(currentOrder?.rating || 5);
  const [review, setReview] = useState(currentOrder?.review || "");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const submitRating = async () => {
    if (submitting || success) return;

    if (!id) {
      Alert.alert(
        "Pesanan tidak ditemukan",
        "Buka ulasan melalui detail pesanan yang ingin dinilai."
      );
      return;
    }

    setSubmitting(true);

    try {
      await updateOrderStatus(id, "Selesai", rating, review);
      setSuccess(true);
    } catch (error) {
      Alert.alert(
        "Gagal menyimpan ulasan",
        "Silakan coba kembali."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={[common.screen, { flex: 1 }]}>
      <ScrollView
        contentContainerStyle={[
          common.content,
          { padding: 24, paddingBottom: 32 },
        ]}
      >
        <Pressable
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/(tabs)/orders");
            }
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "flex-start",
            paddingVertical: 10,
            marginBottom: 12,
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
              fontWeight: "800",
              color: colors.primary,
            }}
          >
            Kembali
          </Text>
        </Pressable>

        <Text style={common.title}>Nilai Layanan</Text>

        <Text style={common.subtitle}>
          Bagaimana pengalaman pindahanmu{" "}
          {id ? `pada pesanan ${id}` : ""}?
        </Text>

        <View
          style={[
            common.card,
            {
              marginTop: 24,
              alignItems: "center",
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 16,
            }}
          >
            {[1, 2, 3, 4, 5].map((x) => (
              <Pressable
                key={x}
                disabled={submitting || success}
                onPress={() => setRating(x)}
                style={{ padding: 5 }}
              >
                <Ionicons
                  name={x <= rating ? "star" : "star-outline"}
                  size={38}
                  color={colors.warning}
                />
              </Pressable>
            ))}
          </View>

          <Text style={{ fontWeight: "800", alignSelf: "flex-start" }}>
            Ulasan
          </Text>

          <TextInput
            style={[
              common.input,
              {
                height: 120,
                textAlignVertical: "top",
                marginTop: 10,
              },
            ]}
            multiline
            editable={!submitting && !success}
            placeholder="Tulis kepuasanmu terhadap pelayanan driver dan armada..."
            value={review}
            onChangeText={setReview}
          />

          {success && (
            <View
              style={{
                alignItems: "center",
                width: "100%",
                marginTop: 20,
                padding: 16,
                borderRadius: 14,
                backgroundColor: colors.softGreen,
              }}
            >
              <Ionicons
                name="checkmark-circle"
                size={44}
                color={colors.success}
              />

              <Text
                style={{
                  color: colors.success,
                  fontSize: 18,
                  fontWeight: "900",
                  marginTop: 8,
                }}
              >
                Ulasan Berhasil Disimpan!
              </Text>

              <Text style={{ textAlign: "center", marginTop: 6 }}>
                Terima kasih sudah menggunakan MoveMate.
              </Text>

              <Pressable
                style={[
                  common.button,
                  { marginTop: 16, width: "100%" },
                ]}
                onPress={() => router.replace("/(tabs)/orders")}
              >
                <Text style={common.buttonText}>
                  Kembali ke Pesanan
                </Text>
              </Pressable>
            </View>
          )}

          {!success && (
            <Pressable
              style={[
                common.button,
                {
                  marginTop: 20,
                  opacity: submitting ? 0.6 : 1,
                },
              ]}
              disabled={submitting}
              onPress={submitRating}
            >
              <Text style={common.buttonText}>
                {submitting ? "Menyimpan Ulasan..." : "Kirim Ulasan"}
              </Text>
            </Pressable>
          )}
        </View>
      </ScrollView>

      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: colors.border,
          backgroundColor: "#FFFFFF",
        }}
      >
        <BottomNav />
      </View>
    </View>
  );
}
