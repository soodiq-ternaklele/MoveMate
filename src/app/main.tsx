import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";

export default function MainMenu() {
  // Menggunakan useWindowDimensions (Hooks) lebih aman & reaktif dibanding Dimensions.get
  const { width } = useWindowDimensions();

  // Kalkulasi lebar tiap kotak layanan: layar dikurang padding (24x2) dan gap (16)
  const cardWidth = (width - 48 - 16) / 2;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.greetingText}>Selamat Pagi,</Text>
            <Text style={styles.userName}>Budi Santoso</Text>
          </View>
          <TouchableOpacity style={styles.profileBtn}>
            {/* Memperbaiki image yang kadang gagal load dengan API ui-avatars yang lebih stabil */}
            <Image
              source={{ uri: 'https://www.instagram.com/p/CmZX0ULvAag/' }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>

        {/* Hero Section / Banner */}
        <View style={styles.heroCard}>
          <View style={styles.heroTextContent}>
            <Text style={styles.heroTitle}>Pindahan Tanpa Pusing!</Text>
            <Text style={styles.heroSubtitle}>Layanan antar jemput logistik & pindahan terpercaya.</Text>
            <TouchableOpacity style={styles.heroButton} onPress={() => router.push("/booking")}>
              <Text style={styles.heroButtonText}>Pesan Sekarang</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require('../../assets/images/hero-illustration.jpg')}
            style={styles.heroImage}
          />
        </View>

        {/* Content Section: Fokus ke Antar Jemput & Pindahan */}
        <Text style={styles.sectionTitle}>Layanan Logistik & Pindahan</Text>
        <View style={styles.servicesGrid}>

          <TouchableOpacity style={[styles.serviceItem, { width: cardWidth }]} onPress={() => router.push("/location")}>
            <View style={[styles.iconBox, { backgroundColor: '#EBF8FF' }]}>
              <Ionicons name="home" size={32} color="#3182CE" />
            </View>
            <Text style={styles.serviceName}>Antar Jemput</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.serviceItem, { width: cardWidth }]} onPress={() => router.push("/location")}>
            <View style={[styles.iconBox, { backgroundColor: '#F0FFF4' }]}>
              <Ionicons name="bus" size={32} color="#38A169" />
            </View>
            <Text style={styles.serviceName}>Sewa Truk / Pikap</Text>
            <Text style={styles.serviceSub}>Armada saja</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.serviceItem, { width: cardWidth }]} onPress={() => router.push("/location")}>
            <View style={[styles.iconBox, { backgroundColor: '#FFF5F5' }]}>
              <Ionicons name="body" size={32} color="#E53E3E" />
            </View>
            <Text style={styles.serviceName}>Tenaga Angkut</Text>
            <Text style={styles.serviceSub}>Kernet (Mate)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.serviceItem, { width: cardWidth }]} onPress={() => router.push("/location")}>
            <View style={[styles.iconBox, { backgroundColor: '#FFFAF0' }]}>
              <Ionicons name="map" size={32} color="#DD6B20" />
            </View>
            <Text style={styles.serviceName}>Antar Kota</Text>
            <Text style={styles.serviceSub}>Luar Jabodetabek</Text>
          </TouchableOpacity>

        </View>

        {/* Action/Promo Section */}
        <Text style={styles.sectionTitle}>Status Pesanan</Text>
        <TouchableOpacity style={styles.statusCard}>
          <View style={styles.statusIcon}>
            <Ionicons name="time" size={24} color="#DD6B20" />
          </View>
          <View style={styles.statusInfo}>
            <Text style={styles.statusTitle}>Belum ada jadwal pindahan</Text>
            <Text style={styles.statusDesc}>Rencanakan pindahanmu hari ini.</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#A0AEC0" />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  container: {
    padding: 24,
    paddingBottom: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  greetingText: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  profileBtn: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E2E8F0',
  },
  heroCard: {
    backgroundColor: '#3182CE',
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#3182CE',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  heroTextContent: {
    flex: 1,
    zIndex: 2,
    paddingRight: 70,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#EBF8FF',
    lineHeight: 20,
    marginBottom: 16,
  },
  heroButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  heroButtonText: {
    color: '#3182CE',
    fontWeight: 'bold',
    fontSize: 14,
  },
  heroImage: {
    position: 'absolute',
    right: -20,
    bottom: -10,
    width: 140,
    height: 140,
    resizeMode: 'contain',
    opacity: 0.95,
    zIndex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 16,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16, // Properti gap menjaga jarak antar kolom dan baris dengan rapi
    marginBottom: 32,
  },
  serviceItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 4,
  },
  serviceSub: {
    fontSize: 12,
    color: '#718096',
    textAlign: 'center',
  },
  statusCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  statusIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFAF0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  statusInfo: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  statusDesc: {
    fontSize: 14,
    color: '#718096',
  },
});
