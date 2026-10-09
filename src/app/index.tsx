import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "admin@movemate.com" && password === "admin") {
      router.replace("/main");
    } else {
      Alert.alert("Login Gagal", "Email atau sandi salah.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Move Mate</Text>
      <Text style={styles.subtitle}>Personal Relocation Companion</Text>

      <TextInput
        style={styles.input}
        placeholder="Email atau No. Telepon"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Masuk</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#F7FAFC",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#2B6CB0",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#4A5568",
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#3182CE",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
