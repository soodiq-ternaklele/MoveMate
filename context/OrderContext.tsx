import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { MoveOrder, OrderStatus } from "@/types";
import { useAuth } from "@/context/AuthContext";

const DEMO_ORDERS: MoveOrder[] = [
  {
    id: "MM-001",
    date: "10 Okt 2026",
    schedule: "10 Okt 2026 • 09:00",
    pickup: "Kos Biru, Jl. Soekarno Hatta",
    destination: "Perumahan Araya",
    route: "Kos Biru → Perumahan Araya",
    vehicle: "Pickup",
    total: 125000,
    price: 125000,
    payment: "QRIS",
    status: "Dalam Perjalanan",
    userEmail: "demo@movemate.id",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "MM-000",
    date: "28 Sep 2026",
    schedule: "28 Sep 2026 • 13:00",
    pickup: "Kampus",
    destination: "Kos Hijau",
    route: "Kampus → Kos Hijau",
    vehicle: "Van",
    total: 140000,
    price: 140000,
    payment: "Transfer",
    status: "Selesai",
    rating: 5,
    userEmail: "demo@movemate.id",
    createdAt: new Date(Date.now() - 86400000 * 24).toISOString(),
  },
];

interface OrderContextType {
  orders: MoveOrder[];
  loading: boolean;
  addOrder: (orderData: {
    pickup: string;
    destination: string;
    vehicle: MoveOrder["vehicle"];
    items?: any;
    schedule: string;
    total: number;
    payment: "QRIS" | "Transfer";
  }) => Promise<MoveOrder>;
  updateOrderStatus: (
    orderId: string,
    status: OrderStatus,
    rating?: number,
    review?: string
  ) => Promise<void>;
  getOrderById: (orderId: string) => MoveOrder | undefined;
  refreshOrders: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [orders, setOrders] = useState<MoveOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const getStorageKey = (email?: string) => {
    if (!email) return null;
    return `movemate_orders_${email.trim().toLowerCase()}`;
  };

  const loadOrders = async () => {
    if (!user || !user.email) {
      setOrders([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const key = getStorageKey(user.email);
      if (!key) return;

      const stored = await AsyncStorage.getItem(key);
      if (stored) {
        setOrders(JSON.parse(stored));
      } else {
        // If demo user and no orders stored yet, seed default orders
        if (user.email.toLowerCase() === "demo@movemate.id") {
          await AsyncStorage.setItem(key, JSON.stringify(DEMO_ORDERS));
          setOrders(DEMO_ORDERS);
        } else {
          // Brand new account starts with empty orders list
          setOrders([]);
          await AsyncStorage.setItem(key, JSON.stringify([]));
        }
      }
    } catch (e) {
      console.error("Failed to load user orders:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [user?.email]);

  const addOrder = async (orderData: {
    pickup: string;
    destination: string;
    vehicle: MoveOrder["vehicle"];
    items?: any;
    schedule: string;
    total: number;
    payment: "QRIS" | "Transfer";
  }): Promise<MoveOrder> => {
    const userEmail = user?.email || "guest@movemate.id";
    const key = getStorageKey(userEmail);

    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const newOrder: MoveOrder = {
      id: `MM-${randomSuffix}`,
      pickup: orderData.pickup,
      destination: orderData.destination,
      route: `${orderData.pickup} → ${orderData.destination}`,
      vehicle: orderData.vehicle,
      items: orderData.items,
      schedule: orderData.schedule,
      date: "Hari ini",
      total: orderData.total,
      price: orderData.total,
      payment: orderData.payment,
      status: "Dalam Perjalanan",
      userEmail: userEmail,
      createdAt: new Date().toISOString(),
    };

    const updated = [newOrder, ...orders];
    setOrders(updated);

    if (key) {
      await AsyncStorage.setItem(key, JSON.stringify(updated));
    }

    // Also add a user-specific notification
    try {
      const notifKey = `movemate_notif_${userEmail.toLowerCase()}`;
      const existingNotif = await AsyncStorage.getItem(notifKey);
      const notifList = existingNotif ? JSON.parse(existingNotif) : [];
      notifList.unshift({
        id: String(Date.now()),
        title: "Pembayaran Berhasil",
        text: `Pesanan ${newOrder.id} (${newOrder.vehicle}) berhasil dibuat dan sedang diproses.`,
        time: "Baru saja",
        userEmail: userEmail,
      });
      await AsyncStorage.setItem(notifKey, JSON.stringify(notifList));
    } catch (e) {
      console.error("Failed to save notification:", e);
    }

    return newOrder;
  };

  const updateOrderStatus = async (
    orderId: string,
    status: OrderStatus,
    rating?: number,
    review?: string
  ) => {
    const key = getStorageKey(user?.email);
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        return {
          ...o,
          status,
          ...(rating !== undefined ? { rating } : {}),
          ...(review !== undefined ? { review } : {}),
        };
      }
      return o;
    });

    setOrders(updated);
    if (key) {
      await AsyncStorage.setItem(key, JSON.stringify(updated));
    }
  };

  const getOrderById = (orderId: string): MoveOrder | undefined => {
    return orders.find((o) => o.id === orderId);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        addOrder,
        updateOrderStatus,
        getOrderById,
        refreshOrders: loadOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used inside OrderProvider");
  return ctx;
}

