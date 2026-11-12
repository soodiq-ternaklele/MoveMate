import { Item, Vehicle } from "@/types";

export const vehicles: Vehicle[] = [
  { id: "1", name: "Motor", capacity: "1–2 kardus", price: 25000, icon: "bicycle" },
  { id: "2", name: "Pickup", capacity: "5–15 kardus", price: 75000, icon: "car" },
  { id: "3", name: "Van", capacity: "10–25 kardus", price: 120000, icon: "car-sport" },
  { id: "4", name: "Truk", capacity: "25–50 kardus", price: 200000, icon: "bus" },
];

export const itemOptions: Item[] = [
  { id: "1", name: "Kardus pakaian", quantity: 0 },
  { id: "2", name: "Kardus buku", quantity: 0 },
  { id: "3", name: "Meja", quantity: 0 },
  { id: "4", name: "Kursi", quantity: 0 },
  { id: "5", name: "Kasur", quantity: 0 },
  { id: "6", name: "Barang elektronik", quantity: 0 },
];

export const notifications = [
  { id: "1", title: "Pembayaran berhasil", text: "Pesanan MM-001 sudah terbayar.", time: "10 menit lalu" },
  { id: "2", title: "Driver menuju lokasi", text: "Budi sedang menuju titik pickup.", time: "25 menit lalu" },
  { id: "3", title: "Promo MoveMate", text: "Diskon 10% untuk pindahan minggu ini.", time: "Kemarin" },
];
