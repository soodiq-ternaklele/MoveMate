import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

// 1. Wajib Menerapkan Type & Array of Objects
export interface AddonService {
  id: string;
  name: string;
  price: number;
  description: string;
}

const mockAddons: AddonService[] = [
  {
    id: 'addon-1',
    name: 'Kernet Tambahan',
    price: 150000,
    description: '1 personil tambahan khusus bongkar muat barang berat.',
  },
  {
    id: 'addon-2',
    name: 'Jasa Angkut Tangga',
    price: 50000,
    description: 'Pengangkutan manual tanpa fasilitas lift (dihitung per lantai).',
  },
  {
    id: 'addon-3',
    name: 'Bongkar Pasang Furnitur',
    price: 100000,
    description: 'Bongkar dan pasang furnitur standar (ranjang kayu, lemari).',
  },
  {
    id: 'addon-4',
    name: 'Sewa Eco-Box',
    price: 25000,
    description: 'Sewa box plastik kokoh ramah lingkungan tanpa limbah kardus.',
  },
];

export default function BookingScreen() {
  // State untuk menyimpan ID layanan tambahan yang dipilih
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Fungsi untuk menambah/menghapus layanan dari state
  const toggleAddon = (id: string) => {
    setSelectedAddons((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((addonId) => addonId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  // 2. Wajib Menerapkan Deklarasi Custom Function & Loop
  const calculateTotalFare = (): number => {
    let total = 0;
    
    // Menggunakan perulangan forEach untuk mengiterasi layanan yang dipilih
    selectedAddons.forEach((selectedId) => {
      const addon = mockAddons.find((item) => item.id === selectedId);
      if (addon) {
        total += addon.price; // Menjumlahkan harga
      }
    });
    
    return total;
  };

  // Helper function untuk format mata uang Rupiah
  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Move Mate</Text>
          <Text style={styles.subtitle}>Pilih Layanan Tambahan (The "Mate" Slider)</Text>
        </View>

        <View style={styles.servicesContainer}>
          {mockAddons.map((addon) => {
            const isSelected = selectedAddons.includes(addon.id);

            return (
              <TouchableOpacity
                key={addon.id}
                onPress={() => toggleAddon(addon.id)}
                activeOpacity={0.8}
                // 3. Wajib Menerapkan Inline & External Style
                // style eksternal (styles.card) digabungkan dengan style inline (backgroundColor dan borderColor)
                style={[
                  styles.card,
                  { backgroundColor: isSelected ? '#EBF8FF' : '#ffffff' },
                  { borderColor: isSelected ? '#3182CE' : '#E2E8F0' }
                ]}
              >
                <View style={styles.cardHeader}>
                  <Text style={[
                    styles.cardTitle,
                    { color: isSelected ? '#2B6CB0' : '#2D3748' } // Inline style dinamis untuk teks
                  ]}>
                    {addon.name}
                  </Text>
                  <Text style={styles.cardPrice}>
                    {formatRupiah(addon.price)}
                  </Text>
                </View>
                <Text style={styles.cardDescription}>{addon.description}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Bagian Footer untuk menampilkan total harga yang reaktif */}
      <View style={styles.footer}>
        <Text style={styles.totalLabel}>Total Biaya Tambahan:</Text>
        {/* Memanggil custom function untuk menampilkan hasil secara reaktif */}
        <Text style={styles.totalAmount}>{formatRupiah(calculateTotalFare())}</Text>
        
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Lanjutkan Pemesanan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// 3. Wajib Menerapkan Inline & External Style (External Style)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2B6CB0',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4A5568',
  },
  servicesContainer: {
    gap: 16, // Jarak antar kartu layanan (React Native 0.71+)
  },
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginRight: 10,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#38A169',
  },
  cardDescription: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 10,
  },
  totalLabel: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2B6CB0',
    marginBottom: 16,
  },
  checkoutButton: {
    backgroundColor: '#3182CE',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
