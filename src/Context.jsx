import { createContext } from 'react';
import { useState, useEffect } from 'react';
import data from '../data.json';

export const contextData = createContext();

export default function ContextProvider({ children }) {
  const [filterProducts, setFilterProducts] = useState(data);
  const [products, setProducts] = useState(data);
  // const [basket, setBasket] = useState([]);
  const [basket, setBasket] = useState(() => {
    // localStorage'dan sepeti oku
    const savedBasket = localStorage.getItem('basket');
    return savedBasket ? JSON.parse(savedBasket) : [];
  });
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [dailySales, setDailySales] = useState(null);
  const [search, setSearch] = useState('');
  const [isOkey, setIsOkey] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [password, setPassword] = useState('3288');

  function saveOrderToLocalStorage() {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD formatında tarih
    const existingData = JSON.parse(localStorage.getItem('dailySales')) || {};

    // O günün mevcut verilerini alıyoruz, yoksa boş bir dizi olarak başlatıyoruz
    const dailyData = existingData[today] || [];

    // Sepet ürünlerini güncelleyerek veya ekleyerek yeni günlük veriyi oluştur
    const updatedData = [...dailyData];

    basket.forEach((newItem) => {
      const existingItemIndex = updatedData.findIndex(
        (item) => item.name === newItem.name
      );

      if (existingItemIndex !== -1) {
        // Aynı isimde bir ürün bulunduğunda, miktarı günceller
        updatedData[existingItemIndex].quantity += newItem.quantity;
        updatedData[existingItemIndex].price +=
          newItem.price * newItem.quantity;
      } else {
        // Aynı isimde ürün yoksa yeni ürün olarak ekler
        updatedData.push({
          name: newItem.name,
          quantity: newItem.quantity,
          price: newItem.price * newItem.quantity,
        });
      }
    });

    // Güncellenmiş günlük veriyi ana veri yapısına kaydediyoruz
    existingData[today] = updatedData;

    // Güncellenmiş veriyi `localStorage`'a kaydediyoruz
    localStorage.setItem('dailySales', JSON.stringify(existingData));
    setIsOkey(true);
    setTimeout(() => {
      setIsOkey(false);
    }, 1000);
    setBasket([]); // Sepeti boşalt
  }

  useEffect(() => {
    // basket değiştiğinde localStorage'a kaydet
    localStorage.setItem('basket', JSON.stringify(basket));

    // Diğer sekmelerdeki değişiklikleri dinle
    const syncBasket = (event) => {
      if (event.key === 'basket') {
        setBasket(JSON.parse(event.newValue));
      }
    };

    window.addEventListener('storage', syncBasket);

    // Bileşen kaldırıldığında dinleyiciyi temizle
    return () => {
      window.removeEventListener('storage', syncBasket);
    };
  }, [basket]);

  function addBasket(product) {
    setIsBasketOpen(true);
    setBasket((prevBasket) => {
      // Sepetteki ürünü bul
      const existingProduct = prevBasket.find((item) => item.id === product.id);

      if (existingProduct) {
        // Ürün zaten sepette varsa miktarını artır
        return prevBasket.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Ürün sepette yoksa yeni ekle
        return [...prevBasket, { ...product, quantity: 1 }];
      }
    });

    setSearch('');
  }

  return (
    <contextData.Provider
      value={{
        products,
        filterProducts,
        basket,
        setProducts,
        setFilterProducts,
        setBasket,
        isBasketOpen,
        setIsBasketOpen,
        saveOrderToLocalStorage,
        dailySales,
        setDailySales,
        search,
        setSearch,
        isOkey,
        setIsOkey,
        open,
        setOpen,
        isDelete,
        setIsDelete,
        password,
        addBasket,
      }}
    >
      {children}
    </contextData.Provider>
  );
}
