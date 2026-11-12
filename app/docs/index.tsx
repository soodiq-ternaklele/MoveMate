
import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function DocsIndex() {
  const [jumlahKlik, setJumlahKlik] = useState(0);
  const [status, setStatus] = useState("Halaman siap digunakan");

  useEffect(() => {
    setStatus(`Tombol telah diklik ${jumlahKlik} kali`);
  }, [jumlahKlik]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Praktik Modul 2</Text>
      <Text style={styles.subtitle}>MoveMate Navigation</Text>

      <View style={styles.card}>
        <Text style={styles.heading}>useState dan useEffect</Text>
        <Text>{status}</Text>

        <Pressable
          style={styles.button}
          onPress={() => setJumlahKlik((nilai) => nilai + 1)}
        >
          <Text style={styles.buttonText}>Tambah Klik</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Praktik Navigasi</Text>

        <Pressable
          style={styles.button}
          onPress={() => router.push("/docs/navigation/push")}
        >
          <Text style={styles.buttonText}>router.push()</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => router.replace("/docs/navigation/replace")}
        >
          <Text style={styles.buttonText}>router.replace()</Text>
        </Pressable>

        <Pressable
          style={styles.backButton}
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              setStatus("Belum ada halaman sebelumnya");
            }
          }}
        >
          <Text style={styles.buttonText}>router.back()</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F4F7FB",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#173B70",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "#555",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 12,
    marginBottom: 16,
    gap: 12,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#173B70",
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  backButton: {
    backgroundColor: "#475569",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
