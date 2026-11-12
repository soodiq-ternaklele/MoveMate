import { Text, View } from "react-native";
import { styles } from "@/constants/styles";

export default function Logo() {
  return (
    <View style={styles.row}>
      <View style={styles.logo}><Text style={styles.logoText}>M</Text></View>
      <View style={{ marginLeft: 12 }}>
        <Text style={{ fontSize: 24, fontWeight: "900", color: "#0F172A" }}>MoveMate</Text>
        <Text style={{ fontSize: 12, color: "#64748B" }}>Pindahan jadi lebih mudah</Text>
      </View>
    </View>
  );
}
