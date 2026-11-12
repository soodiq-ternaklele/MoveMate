import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { Alert, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { common, colors, styles } from "@/constants/styles";
import { itemOptions, vehicles } from "@/data/mock";
import { Item, VehicleType } from "@/types";

export default function Pesan() {
  const [pickup,setPickup]=useState("Kos Biru, Jl. Soekarno Hatta");
  const [destination,setDestination]=useState("Perumahan Araya");
  const [vehicle,setVehicle]=useState<VehicleType>("Pickup");
  const [date,setDate]=useState("Sabtu, 10 Oktober 2026 • 09:00");
  const [items,setItems]=useState<Item[]>(itemOptions.map(x=>({...x})));

  const totalItems = items.reduce((sum,item)=>sum+item.quantity,0);
  const selected = vehicles.find(v=>v.name===vehicle)!;
  const total = useMemo(()=>selected.price + Math.max(0,totalItems-5)*5000, [selected,totalItems]);

  const changeQty=(id:string,delta:number)=>{
    setItems(prev=>prev.map(item=>item.id===id ? {...item,quantity:Math.max(0,item.quantity+delta)} : item));
  };
  const openingRef = useRef(false);
  const [openingCheckout, setOpeningCheckout] = useState(false);
  const [formError, setFormError] = useState("");

  const submit = () => {
    if (openingRef.current) return;

    // Validasi memakai banner inline (bukan Alert) agar pesannya
    // juga muncul saat aplikasi dijalankan di web/browser.
    if (!pickup.trim() || !destination.trim() || totalItems === 0) {
      setFormError(
        "Lengkapi pesanan: isi lokasi penjemputan, tujuan, dan minimal 1 barang."
      );
      return;
    }

    if (!date.trim()) {
      setFormError("Masukkan jadwal pindahan terlebih dahulu.");
      return;
    }

    setFormError("");
    openingRef.current = true;
    setOpeningCheckout(true);

    try {
      router.push({
        pathname: "/checkout",
        params: {
          pickup: pickup.trim(),
          destination: destination.trim(),
          vehicle,
          total: String(total),
          date: date.trim(),
          items: String(totalItems),
        },
      });
    } catch (error) {
      Alert.alert("Gagal membuka pembayaran", "Silakan coba kembali.");
    } finally {
      // Jaga-jaga: reset tombol agar tidak terkunci selamanya
      // bila navigasi gagal dibuka secara diam-diam.
      setTimeout(() => {
        openingRef.current = false;
        setOpeningCheckout(false);
      }, 800);
    }
  };

  return <ScrollView style={common.screen} contentContainerStyle={common.content}>
    <Text style={common.title}>Pesan Pindahan</Text>
    <Text style={common.subtitle}>Atur detail pindahanmu dalam satu layar.</Text>

    <Text style={[styles.sectionTitle,{marginTop:22}]}>1. Lokasi</Text>
    <View style={common.card}>
      <Text style={{fontWeight:"800"}}>📍 Pickup</Text>
      <TextInput style={common.input} value={pickup} onChangeText={setPickup}/>
      <Text style={{fontWeight:"800",marginTop:14}}>🎯 Tujuan</Text>
      <TextInput style={common.input} value={destination} onChangeText={setDestination}/>
      <Pressable style={{marginTop:12,flexDirection:"row",alignItems:"center"}} onPress={()=>Alert.alert("Map demo","Pada versi tugas ini map dibuat sebagai simulasi. Integrasi Google Maps dapat ditambahkan pada modul berikutnya.")}>
        <Ionicons name="map-outline" size={20} color={colors.primary}/>
        <Text style={{color:colors.primary,fontWeight:"800",marginLeft:7}}>Pilih dari Map</Text>
      </Pressable>
    </View>

    <Text style={styles.sectionTitle}>2. Kendaraan</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {vehicles.map(v=><Pressable key={v.id} onPress={()=>setVehicle(v.name)} style={[common.card,{width:145,marginRight:10,borderColor:vehicle===v.name?colors.primary:colors.border,borderWidth:vehicle===v.name?2:1}]}>
        <Ionicons name={v.icon as any} size={27} color={colors.primary}/>
        <Text style={{fontWeight:"900",marginTop:8}}>{v.name}</Text>
        <Text style={styles.small}>{v.capacity}</Text>
        <Text style={{fontWeight:"800",marginTop:6}}>Rp{v.price.toLocaleString("id-ID")}</Text>
      </Pressable>)}
    </ScrollView>

    <Text style={styles.sectionTitle}>3. Barang</Text>
    <View style={common.card}>
      {items.map(item=><View key={item.id} style={[styles.between,{paddingVertical:9,borderBottomWidth:1,borderBottomColor:"#F1F5F9"}]}>
        <View><Text style={{fontWeight:"700"}}>{item.name}</Text><Text style={styles.small}>Jumlah: {item.quantity}</Text></View>
        <View style={styles.row}>
          <Pressable onPress={()=>changeQty(item.id,-1)} style={{padding:8}}><Ionicons name="remove-circle-outline" size={25} color={colors.primary}/></Pressable>
          <Text style={{fontWeight:"900",width:25,textAlign:"center"}}>{item.quantity}</Text>
          <Pressable onPress={()=>changeQty(item.id,1)} style={{padding:8}}><Ionicons name="add-circle-outline" size={25} color={colors.primary}/></Pressable>
        </View>
      </View>)}
    </View>

    <Text style={styles.sectionTitle}>4. Jadwal</Text>
    <TextInput style={common.input} value={date} onChangeText={setDate}/>

    <View style={[common.card,{backgroundColor:colors.softBlue,marginTop:18}]}>
      <View style={styles.between}><Text style={{fontWeight:"700"}}>Total barang</Text><Text style={{fontWeight:"900"}}>{totalItems} item</Text></View>
      <View style={[styles.between,{marginTop:8}]}><Text style={{fontWeight:"700"}}>Estimasi biaya</Text><Text style={[styles.price,{color:colors.primary}]}>Rp{total.toLocaleString("id-ID")}</Text></View>
    </View>
    
    
    {formError !== "" && (
      <View
        style={{
          backgroundColor: "#FEF2F2",
          borderRadius: 12,
          padding: 14,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: colors.danger, fontWeight: "700" }}>
          ⚠️ {formError}
        </Text>
      </View>
    )}

<Pressable
  style={common.button}
  onPress={submit}
  disabled={openingCheckout}
>
  <Text style={common.buttonText}>
    {openingCheckout
      ? "Membuka Checkout..."
      : "Lanjut ke Pembayaran"}
  </Text>
</Pressable>

  </ScrollView>;
}
