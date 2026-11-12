import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthResponse, User, UserAccount } from "@/types";

const MOVEMATE_ACCOUNTS_KEY = "movemate_accounts";
const MOVEMATE_USER_KEY = "movemate_user";
const MOVEMATE_LEGACY_ACCOUNT_KEY = "movemate_account";

const DEFAULT_ACCOUNTS: UserAccount[] = [
  {
    id: "usr_demo",
    name: "Demo User",
    email: "demo@movemate.id",
    phone: "081234567890",
    password: "123456",
    createdAt: new Date().toISOString(),
  },
];

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (identity: string, password: string) => Promise<AuthResponse>;
  register: (name: string, email: string, phone: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  getAllAccountsCount?: () => Promise<number>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize accounts and current logged in user
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Ensure accounts store exists
        const storedAccounts = await AsyncStorage.getItem(MOVEMATE_ACCOUNTS_KEY);
        if (!storedAccounts) {
          let initialList = [...DEFAULT_ACCOUNTS];
          // Check if there is an old single account to migrate
          const legacy = await AsyncStorage.getItem(MOVEMATE_LEGACY_ACCOUNT_KEY);
          if (legacy) {
            try {
              const parsedLegacy = JSON.parse(legacy);
              if (parsedLegacy && parsedLegacy.email) {
                const exists = initialList.some(
                  (a) => a.email.toLowerCase() === parsedLegacy.email.toLowerCase()
                );
                if (!exists) {
                  initialList.push({
                    id: "usr_migrated_" + Date.now(),
                    name: parsedLegacy.name || "User",
                    email: parsedLegacy.email,
                    phone: parsedLegacy.phone || "",
                    password: parsedLegacy.password || "123456",
                    createdAt: new Date().toISOString(),
                  });
                }
              }
            } catch (e) {
              console.error("Migration error", e);
            }
          }
          await AsyncStorage.setItem(MOVEMATE_ACCOUNTS_KEY, JSON.stringify(initialList));
        }

        // Restore logged in user
        const currentUserData = await AsyncStorage.getItem(MOVEMATE_USER_KEY);
        if (currentUserData) {
          setUser(JSON.parse(currentUserData));
        }
      } catch (err) {
        console.error("Failed to initialize auth:", err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const getAccounts = async (): Promise<UserAccount[]> => {
    try {
      const data = await AsyncStorage.getItem(MOVEMATE_ACCOUNTS_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error("Error reading accounts:", e);
    }
    return [...DEFAULT_ACCOUNTS];
  };

  const login = async (identity: string, password: string): Promise<AuthResponse> => {
    const cleanIdentity = identity.trim();
    if (!cleanIdentity) {
      return { success: false, message: "Silakan masukkan email atau nomor HP Anda." };
    }
    if (!password) {
      return { success: false, message: "Silakan masukkan kata sandi Anda." };
    }

    const accounts = await getAccounts();
    const cleanIdLower = cleanIdentity.toLowerCase();

    // Find account by email or phone
    const found = accounts.find(
      (acc) =>
        acc.email.toLowerCase() === cleanIdLower ||
        acc.phone.trim() === cleanIdentity
    );

    if (!found) {
      return {
        success: false,
        message: "Akun tidak ditemukan. Periksa kembali email/nomor HP Anda atau silakan daftar.",
      };
    }

    // Explicitly verify password
    if (found.password !== password) {
      return {
        success: false,
        message: "Kata sandi salah. Silakan periksa kembali kata sandi yang Anda masukkan.",
      };
    }

    // Password is correct, set active user
    const current: User = {
      id: found.id,
      name: found.name,
      email: found.email,
      phone: found.phone,
    };

    await AsyncStorage.setItem(MOVEMATE_USER_KEY, JSON.stringify(current));
    setUser(current);
    return { success: true, message: "Login berhasil!" };
  };

  const register = async (
    name: string,
    email: string,
    phone: string,
    password: string
  ): Promise<AuthResponse> => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();

    if (!cleanName) {
      return { success: false, message: "Nama lengkap wajib diisi." };
    }
    if (!cleanEmail || !cleanEmail.includes("@")) {
      return { success: false, message: "Format email tidak valid." };
    }
    if (!cleanPhone || cleanPhone.replace(/\D/g, "").length < 8) {
      return { success: false, message: "Nomor HP minimal 8 digit angka." };
    }
    if (!password || password.length < 4) {
      return { success: false, message: "Kata sandi minimal 4 karakter." };
    }

    const accounts = await getAccounts();

    // Check duplicate email
    if (accounts.some((a) => a.email.toLowerCase() === cleanEmail)) {
      return {
        success: false,
        message: "Email ini sudah terdaftar. Silakan login atau gunakan email lain.",
      };
    }

    // Check duplicate phone
    if (accounts.some((a) => a.phone.trim() === cleanPhone)) {
      return {
        success: false,
        message: "Nomor HP ini sudah terdaftar. Silakan gunakan nomor lain.",
      };
    }

    const newAccount: UserAccount = {
      id: "usr_" + Date.now(),
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      password: password,
      createdAt: new Date().toISOString(),
    };

    const updatedAccounts = [...accounts, newAccount];
    await AsyncStorage.setItem(MOVEMATE_ACCOUNTS_KEY, JSON.stringify(updatedAccounts));

    // Also update legacy single account key for safety
    await AsyncStorage.setItem(MOVEMATE_LEGACY_ACCOUNT_KEY, JSON.stringify(newAccount));

    const current: User = {
      id: newAccount.id,
      name: newAccount.name,
      email: newAccount.email,
      phone: newAccount.phone,
    };

    await AsyncStorage.setItem(MOVEMATE_USER_KEY, JSON.stringify(current));
    setUser(current);
    return { success: true, message: "Pendaftaran akun berhasil!" };
  };

  const logout = async () => {
    await AsyncStorage.removeItem(MOVEMATE_USER_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
