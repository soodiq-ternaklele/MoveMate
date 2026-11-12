import { useState } from "react";
import { Alert, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Logo from "@/components/Logo";
import { common, colors } from "@/constants/styles";
import { useAuth } from "@/context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setErrorMessage("");
    if (!name.trim()) {
      setErrorMessage("Nama lengkap wajib diisi.");
      Alert.alert("Registrasi Gagal", "Nama lengkap wajib diisi.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Format email tidak valid (contoh: nama@domain.com).");
      Alert.alert("Registrasi Gagal", "Format email tidak valid.");
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, "").length < 8) {
      setErrorMessage("Nomor HP minimal 8 digit angka.");
      Alert.alert("Registrasi Gagal", "Nomor HP minimal 8 digit angka.");
      return;
    }
    if (!password || password.length < 4) {
      setErrorMessage("Kata sandi minimal 4 karakter.");
      Alert.alert("Registrasi Gagal", "Kata sandi minimal 4 karakter.");
      return;
    }

    setLoading(true);
    try {
      const res = await register(name, email, phone, password);
      if (!res.success) {
        setErrorMessage(res.message);
        Alert.alert("Registrasi Gagal", res.message);
        return;
      }
      Alert.alert("Sukses", "Akun berhasil dibuat. Selamat datang di MoveMate!");
      router.replace("/home");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 60 }} style={common.screen}>
      <Logo />
      <Text style={[common.title, { marginTop: 30 }]}>Buat akun MoveMate</Text>
      <Text style={common.subtitle}>Daftar akun baru untuk mulai memesan jasa pindahan.</Text>

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

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: "700" }}>Nama Lengkap</Text>
        <TextInput
          style={common.input}
          placeholder="Budi Santoso"
          value={name}
          onChangeText={(val) => {
            setName(val);
            if (errorMessage) setErrorMessage("");
          }}
        />
      </View>

      <View style={{ marginTop: 16 }}>
        <Text style={{ fontWeight: "700" }}>Email</Text>
        <TextInput
          style={common.input}
          placeholder="budi@email.com"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={(val) => {
            setEmail(val);
            if (errorMessage) setErrorMessage("");
          }}
        />
      </View>

      <View style={{ marginTop: 16 }}>
        <Text style={{ fontWeight: "700" }}>Nomor HP</Text>
        <TextInput
          style={common.input}
          placeholder="081234567890"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={(val) => {
            setPhone(val);
            if (errorMessage) setErrorMessage("");
          }}
        />
      </View>

      <View style={{ marginTop: 16 }}>
        <Text style={{ fontWeight: "700" }}>Password</Text>
        <View style={{ position: "relative", justifyContent: "center" }}>
          <TextInput
            style={[common.input, { paddingRight: 45 }]}
            placeholder="Minimal 4 karakter"
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
      </View>

      <Pressable
        style={[common.button, { marginTop: 26, opacity: loading ? 0.7 : 1 }]}
        disabled={loading}
        onPress={submit}
      >
        <Text style={common.buttonText}>{loading ? "Mendaftarkan..." : "Daftar & Masuk"}</Text>
      </Pressable>

      <Pressable onPress={() => router.back()} style={{ alignItems: "center", marginTop: 18 }}>
        <Text style={{ color: "#2563EB", fontWeight: "700" }}>Sudah punya akun? Kembali ke Login</Text>
      </Pressable>
    </ScrollView>
  );
}
