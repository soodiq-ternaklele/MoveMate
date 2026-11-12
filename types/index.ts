export type VehicleType = "Motor" | "Pickup" | "Van" | "Truk";

export type OrderStatus =
  | "Menunggu Pembayaran"
  | "Pembayaran Berhasil"
  | "Driver Menuju Pickup"
  | "Barang Diangkut"
  | "Dalam Perjalanan"
  | "Selesai";

export interface User {
  id?: string;
  name: string;
  email: string;
  phone: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
}

export interface Vehicle {
  id: string;
  name: VehicleType;
  capacity: string;
  price: number;
  icon: string;
}

export interface Item {
  id: string;
  name: string;
  quantity: number;
}

export interface MoveOrder {
  id: string;
  pickup: string;
  destination: string;
  route?: string;
  vehicle: VehicleType;
  items?: Item[] | number | string;
  schedule: string;
  date?: string;
  total: number;
  price?: number;
  payment: "QRIS" | "Transfer";
  status: OrderStatus;
  rating?: number;
  review?: string;
  userEmail: string;
  createdAt: string;
}

export interface AppNotification {
  id: string;
  title: string;
  text: string;
  time: string;
  userEmail?: string;
}
