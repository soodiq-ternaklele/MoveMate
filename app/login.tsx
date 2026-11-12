import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Logo from "@/components/Logo";
import { common, colors } from "@/constants/styles";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setErrorMessage("");
    if (!identity.trim()) {
      setErrorMessage("Silakan masukkan email atau nomor HP.");
      Alert.alert("Login Gagal", "Silakan masukkan email atau nomor HP.");
      return;
    }
    if (!password) {
      setErrorMessage("Silakan masukkan kata sandi.");
      Alert.alert("Login Gagal", "Silakan masukkan kata sandi.");
      return;
    }

    setLoading(true);
    try {
      const res = await login(identity, password);
      if (!res.success) {
        setErrorMessage(res.message);
        Alert.alert("Login Gagal", res.message);
        return;
      }
      router.replace("/home");
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setIdentity("demo@movemate.id");
    setPassword("123456");
    setErrorMessage("");
  };

  return (
    <View style={[common.screen, { padding: 24, justifyContent: "center" }]}>
      <Logo />
      <Text style={{ fontSize: 28, fontWeight: "900", marginTop: 35, color: "#0F172A" }}>
        Selamat datang 👋
      </Text>
      <Text style={common.subtitle}>Login untuk melanjutkan pemesanan jasa pindahan.</Text>

      {/* Error Banner */}
      {errorMessage ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#FEE2E2",
            borderColor: "#EF4444",
            borderWidth: 1,
            borderRadius: 12,
            padding: 12,
            marginTop: 18,
          }}
        >
          <Ionicons name="alert-circle" size={22} color="#DC2626" />
          <Text style={{ color: "#DC2626", fontWeight: "700", marginLeft: 8, flex: 1, fontSize: 13 }}>
            {errorMessage}
          </Text>
        </View>
      ) : null}

      <Text style={{ marginTop: 20, fontWeight: "700" }}>Email / Nomor HP</Text>
      <TextInput
        style={common.input}
        placeholder="contoh@email.com / 0812..."
        value={identity}
        autoCapitalize="none"
        onChangeText={(val) => {
          setIdentity(val);
          if (errorMessage) setErrorMessage("");
        }}
      />

      <Text style={{ marginTop: 16, fontWeight: "700" }}>Password</Text>
      <View style={{ position: "relative", justifyContent: "center" }}>
        <TextInput
          style={[common.input, { paddingRight: 45 }]}
          placeholder="••••••••"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(val) => {
            setPassword(val);
            if (errorMessage) setErrorMessage("");
          }}
        />
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          style={{ position: "absolute", right: 12, top: 12, padding: 4 }}
        >
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={20}
            color={colors.muted}
          />
        </Pressable>
      </View>

      <Pressable
        style={[common.button, { marginTop: 24, opacity: loading ? 0.7 : 1 }]}
        disabled={loading}
        onPress={handleLogin}
      >
        <Text style={common.buttonText}>{loading ? "Memproses..." : "Login"}</Text>
      </Pressable>

      <View
        style={{
          marginTop: 20,
          padding: 12,
          backgroundColor: "#F8FAFC",
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#E2E8F0",
        }}
      >
        <Text style={{ fontSize: 12, color: "#64748B", textAlign: "center" }}>
          Demo Account: <Text style={{ fontWeight: "700" }}>demo@movemate.id</Text> | Sandi:{" "}
          <Text style={{ fontWeight: "700" }}>123456</Text>
        </Text>
        <Pressable onPress={fillDemo} style={{ marginTop: 6, alignItems: "center" }}>
          <Text style={{ color: colors.primary, fontWeight: "800", fontSize: 12 }}>
            Gunakan Akun Demo
          </Text>
        </Pressable>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 22 }}>
        <Text>Belum punya akun? </Text>
        <Link href="/register" style={{ color: "#2563EB", fontWeight: "800" }}>
          Daftar
        </Link>
      </View>
    </View>
  );
}
