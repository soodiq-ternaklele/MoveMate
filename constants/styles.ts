import { StyleSheet } from "react-native";

export const colors = {
  primary: "#2563EB",
  primaryDark: "#1D4ED8",
  secondary: "#0F172A",
  background: "#F8FAFC",
  card: "#FFFFFF",
  text: "#0F172A",
  muted: "#64748B",
  border: "#E2E8F0",
  success: "#16A34A",
  warning: "#F59E0B",
  danger: "#DC2626",
  softBlue: "#EFF6FF",
  softGreen: "#F0FDF4",
};

export const common = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 110 },
  title: { fontSize: 26, fontWeight: "800", color: colors.text },
  subtitle: { fontSize: 14, color: colors.muted, marginTop: 4, lineHeight: 20 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { color: "#FFFFFF", fontWeight: "800", fontSize: 15 },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    color: colors.text,
    marginTop: 8,
  },
});

export const styles = StyleSheet.create({
  logo: { width: 58, height: 58, borderRadius: 18, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" },
  logoText: { color: "#FFF", fontSize: 25, fontWeight: "900" },
  row: { flexDirection: "row", alignItems: "center" },
  between: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  chip: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, backgroundColor: colors.softBlue },
  chipText: { color: colors.primary, fontWeight: "700", fontSize: 12 },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: colors.text, marginBottom: 10 },
  small: { fontSize: 12, color: colors.muted },
  price: { fontSize: 18, fontWeight: "900", color: colors.text },
});
