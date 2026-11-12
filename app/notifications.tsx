import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { common, colors, styles } from "@/constants/styles";
import { useAuth } from "@/context/AuthContext";
import { notifications as defaultNotifs } from "@/data/mock";

export default function Notifications() {
  const { user } = useAuth();
  const [list, setList] = useState(defaultNotifs);

  useEffect(() => {
    const loadNotifs = async () => {
      if (!user?.email) return;
      try {
        const key = `movemate_notif_${user.email.toLowerCase()}`;
        const stored = await AsyncStorage.getItem(key);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setList(parsed);
          }
        }
      } catch (e) {
        console.error("Error loading notifications:", e);
      }
    };
    loadNotifs();
  }, [user?.email]);

  return (
    <ScrollView style={common.screen} contentContainerStyle={common.content}>
      <Pressable
  onPress={() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/home");
    }
  }}
  style={{
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingRight: 12,
    marginBottom: 8,
  }}
>
  <Ionicons
    name="arrow-back"
    size={22}
    color={colors.primary}
  />
  <Text
    style={{
      color: colors.primary,
      fontWeight: "800",
      marginLeft: 6,
    }}
  >
    Kembali
  </Text>
    </Pressable>

      <Text style={common.title}>Notifikasi</Text>
      <Text style={common.subtitle}>
        Pemberitahuan untuk {user?.name || "akun Anda"}.
      </Text>
      <View style={{ marginTop: 20 }}>
        {list.map((n) => (
          <View key={n.id} style={[common.card, styles.row]}>
            <View style={{ backgroundColor: colors.softBlue, padding: 12, borderRadius: 14 }}>
              <Ionicons name="notifications" size={22} color={colors.primary} />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={{ fontWeight: "900" }}>{n.title}</Text>
              <Text style={styles.small}>{n.text}</Text>
              <Text style={{ fontSize: 11, color: colors.muted, marginTop: 5 }}>{n.time}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
