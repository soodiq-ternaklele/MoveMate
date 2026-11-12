import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function BottomNav() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: "#2563EB",
      tabBarInactiveTintColor: "#94A3B8",
      tabBarStyle: { height: 68, paddingBottom: 9, paddingTop: 7, borderTopColor: "#E2E8F0" },
    }}>
      <Tabs.Screen name="home" options={{ title: "Beranda", tabBarIcon: ({color,size}) => <Ionicons name="home-outline" size={size} color={(color ?? "#94A3B8") as any}/> }} />
      <Tabs.Screen name="pesan" options={{ title: "Pesan", tabBarIcon: ({color,size}) => <Ionicons name="cube-outline" size={size} color={(color ?? "#94A3B8") as any}/> }} />
      <Tabs.Screen name="orders" options={{ title: "Pesanan", tabBarIcon: ({color,size}) => <Ionicons name="receipt-outline" size={size} color={(color ?? "#94A3B8") as any}/> }} />
      <Tabs.Screen name="profile" options={{ title: "Profil", tabBarIcon: ({color,size}) => <Ionicons name="person-outline" size={size} color={(color ?? "#94A3B8") as any}/> }} />
    </Tabs>
  );
}
