import { router } from "expo-router";
import { Alert, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { common, colors, styles } from "@/constants/styles";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();

  const keluar = async () => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm("Yakin ingin keluar dari akun?");
      if (confirmed) {
        await logout();
        router.replace("/login");
      }
    } else {
      Alert.alert("Logout", "Yakin ingin keluar?", [
        { text: "Batal", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await logout();
            router.replace("/login");
          },
        },
      ]);
    }
  };

  return (
    <ScrollView style={common.screen} contentContainerStyle={common.content}>
      <Text style={common.title}>Profil</Text>

      <View style={[common.card, { marginTop: 20, alignItems: "center" }]}>
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: colors.softBlue,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 32, fontWeight: "900", color: colors.primary }}>
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </Text>
        </View>
        <Text style={{ fontSize: 20, fontWeight: "900", marginTop: 12 }}>
          {user?.name || "Pengguna"}
        </Text>
        <Text style={styles.small}>{user?.email || "-"}</Text>
        <Text style={styles.small}>{user?.phone || "-"}</Text>
      </View>

      {[
        ["person-outline", "Data Profil", "Informasi akun yang sedang aktif"],
        ["shield-checkmark-outline", "Keamanan Akun", "Kata sandi terlindungi"],
        ["help-circle-outline", "Bantuan & FAQ", "Pertanyaan umum seputar layanan MoveMate"],
      ].map(([icon, title, desc]) => (
        <View key={title} style={[common.card, styles.row]}>
          <Text style={{ fontSize: 22 }}>
            {icon === "person-outline" ? "👤" : icon === "shield-checkmark-outline" ? "🛡️" : "❓"}
          </Text>
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={{ fontWeight: "800" }}>{title}</Text>
            <Text style={styles.small}>{desc}</Text>
          </View>
        </View>
      ))}

      <Pressable
        onPress={keluar}
        style={[common.button, { backgroundColor: "#FEE2E2", marginTop: 10 }]}
      >
        <Text style={{ color: "#DC2626", fontWeight: "900" }}>Logout</Text>
      </Pressable>
    </ScrollView>
  );
}
