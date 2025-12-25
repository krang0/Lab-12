// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Kütüphaneyi ekledik

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Yükleme kontrolü

  // 1. Uygulama başlayınca kullanıcıyı hafızadan oku
  useEffect(() => {
    AsyncStorage.getItem('user').then(stored => {
      if (stored) {
        setUser(JSON.parse(stored));
      }
      setIsLoading(false); // Okuma işlemi bitti
    });
  }, []);

  // 2. Kullanıcı (user) değiştiğinde hafızayı güncelle
  useEffect(() => {
    if (isLoading) return; // Hala ilk yükleme yapılıyorsa işlem yapma (Hata önlemi)

    if (user) {
      AsyncStorage.setItem('user', JSON.stringify(user));
    } else {
      AsyncStorage.removeItem('user');
    }
  }, [user, isLoading]);

  const login = (username) => {
    setUser({ username });
  };

  const logout = () => {
    setUser(null);
  };

  // 3. Veri okunurken hiçbir şey gösterme (veya Splash Screen)
  if (isLoading) {
    return null; 
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}