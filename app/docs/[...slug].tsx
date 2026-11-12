
import { View, Text, Pressable, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

export default function DocsSlugPage() {
  const { slug } = useLocalSearchParams<{ slug?: string | string[] }>();

  const path = Array.isArray(slug)
    ? slug.join("/")
    : slug ?? "halaman";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catch-All Route</Text>

      <Text style={styles.label}>Path yang diterima:</Text>
      <Text style={styles.path}>{path}</Text>

      <Text style={styles.description}>
        Halaman ini menggunakan useLocalSearchParams untuk membaca
        segmen URL yang ditangkap oleh [...slug].tsx.
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Kembali</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => router.replace("/docs")}
      >
        <Text style={styles.buttonText}>Kembali ke Menu Modul</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#F4F7FB",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#173B70",
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  path: {
    fontSize: 20,
    color: "#2563EB",
    marginVertical: 12,
    fontWeight: "bold",
  },
  description: {
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
