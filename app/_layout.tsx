import { Stack } from "expo-router";
import { AuthProvider } from "@/context/AuthContext";
import { OrderProvider } from "@/context/OrderContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <OrderProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />

          <Stack.Screen name="(tabs)" />

          <Stack.Screen name="checkout" />
          <Stack.Screen name="tracking" />
          <Stack.Screen name="notifications" />
          <Stack.Screen name="rating" />
          <Stack.Screen name="orders" />
        </Stack>
      </OrderProvider>
    </AuthProvider>
  );
}