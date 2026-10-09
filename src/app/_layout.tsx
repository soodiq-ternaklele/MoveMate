import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="main" options={{ title: "Beranda Utama", headerBackVisible: false }} />
      <Stack.Screen 
        name="booking"
        options={{
          title: "Layanan Tambahan",
          headerShadowVisible: false, // Menghilangkan garis/bayangan di bawah header
        }}
      />
      <Stack.Screen 
        name="location"
        options={{
          title: "Detail Rute",
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
