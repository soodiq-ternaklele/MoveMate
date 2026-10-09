import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Mock data suggestions untuk simulasi Google Places Autocomplete
const MOCK_PLACES = [
  { id: '1', mainText: 'Apartemen Taman Anggrek', secondaryText: 'Jl. Letjen S. Parman, Jakarta Barat' },
  { id: '2', mainText: 'Taman Suropati', secondaryText: 'Menteng, Kota Jakarta Pusat' },
  { id: '3', mainText: 'Stasiun Gambir', secondaryText: 'Jl. Medan Merdeka Tim., Jakarta Pusat' },
  { id: '4', mainText: 'Bandara Soekarno-Hatta', secondaryText: 'Tangerang, Banten' },
];

export default function LocationScreen() {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  
  // State untuk melacak input mana yang sedang aktif diketik
  const [activeInput, setActiveInput] = useState<'pickup' | 'dropoff' | null>(null);

  const handleNext = () => {
    router.push('/booking');
  };

  const handleSelectPlace = (place: typeof MOCK_PLACES[0]) => {
    if (activeInput === 'pickup') {
      setPickup(place.mainText);
    } else if (activeInput === 'dropoff') {
      setDropoff(place.mainText);
    }
    // Tutup panel setelah memilih
    setActiveInput(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Tentukan Rute</Text>
          <Text style={styles.subtitle}>Masukkan alamat penjemputan dan tujuan</Text>

          <View style={styles.locationCard}>
            <View style={styles.inputContainer}>
              <Ionicons name="location" size={24} color="#3182CE" style={styles.icon} />
              <View style={styles.textInputWrapper}>
                <Text style={styles.label}>Lokasi Jemput (Awal)</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Cari alamat jemput..." 
                  value={pickup}
                  onChangeText={setPickup}
                  onFocus={() => setActiveInput('pickup')}
                />
              </View>
            </View>

            <View style={styles.divider}>
              <View style={styles.dottedLine} />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="flag" size={24} color="#E53E3E" style={styles.icon} />
              <View style={styles.textInputWrapper}>
                <Text style={styles.label}>Lokasi Tujuan</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Cari alamat tujuan..." 
                  value={dropoff}
                  onChangeText={setDropoff}
                  onFocus={() => setActiveInput('dropoff')}
                />
              </View>
            </View>
          </View>

          {/* Autocomplete Suggestions Panel (Google Assist Simulation) */}
          {activeInput && (
            <View style={styles.autocompleteContainer}>
              <View style={styles.poweredByGoogle}>
                <Text style={styles.poweredText}>didukung oleh</Text>
                <Text style={styles.googleText}>Google</Text>
              </View>
              <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                {MOCK_PLACES.map((place) => (
                  <TouchableOpacity 
                    key={place.id} 
                    style={styles.placeItem}
                    onPress={() => handleSelectPlace(place)}
                  >
                    <Ionicons name="location-outline" size={20} color="#718096" style={styles.placeIcon} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.placeMainText} numberOfLines={1}>{place.mainText}</Text>
                      <Text style={styles.placeSubText} numberOfLines={1}>{place.secondaryText}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          <TouchableOpacity 
            style={[styles.button, (!pickup || !dropoff) && styles.buttonDisabled]} 
            onPress={handleNext}
            disabled={!pickup || !dropoff}
          >
            <Text style={styles.buttonText}>Lanjut Pilih Layanan Tambahan</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  content: {
    padding: 24,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 24,
  },
  locationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 16,
  },
  textInputWrapper: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#A0AEC0',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2D3748',
    padding: 0,
  },
  divider: {
    height: 30,
    marginLeft: 11,
    marginVertical: 4,
    justifyContent: 'center',
  },
  dottedLine: {
    width: 2,
    height: '100%',
    backgroundColor: '#CBD5E0',
    borderStyle: 'dashed',
  },
  // Autocomplete Styles
  autocompleteContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  poweredByGoogle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
    marginBottom: 8,
  },
  poweredText: {
    fontSize: 10,
    color: '#718096',
    marginRight: 4,
  },
  googleText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4285F4',
  },
  placeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },
  placeIcon: {
    marginRight: 12,
  },
  placeMainText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 2,
  },
  placeSubText: {
    fontSize: 12,
    color: '#A0AEC0',
  },
  button: {
    backgroundColor: '#3182CE',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#3182CE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 'auto',
  },
  buttonDisabled: {
    backgroundColor: '#CBD5E0',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
