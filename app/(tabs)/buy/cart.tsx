import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* ================= DATA ================= */

const INITIAL_CART = [
  {
    id: "1",
    name: "ProRun Running Shoes",
    price: 120,
    qty: 1,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "2",
    name: "Tech-Fit Compression Shorts",
    price: 45,
    qty: 1,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
  },
];

/* ================= SCREEN ================= */

export default function CartScreen() {
  const isDark = useColorScheme() === "dark";
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<typeof INITIAL_CART>([]);

  /* ================= FAKE API ================= */
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setCart(INITIAL_CART); // change to [] to test empty state
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  function updateQty(id: string, delta: number) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  }

  function removeItem(id: string) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = cart.length ? 5 : 0;
  const total = subtotal + shipping;

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center gap-2 px-4 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDark ? "#9ca3af" : "#6c757d"}
          />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-text-primary dark:text-white">
          Cart
        </Text>
      </View>

      {/* ================= CONTENT ================= */}
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-4">
        {/* ---------- LOADING ---------- */}
        {loading &&
          [1, 2].map((i) => (
            <View
              key={i}
              className="mb-4 h-24 rounded-xl bg-slate-200 dark:bg-slate-700"
            />
          ))}

        {/* ---------- CART ITEMS ---------- */}
        {!loading &&
          cart.map((item) => (
            <View
              key={item.id}
              className="flex-row items-center gap-4 mb-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 p-3"
            >
              <Image
                source={{ uri: item.image }}
                className="h-20 w-20 rounded-lg"
              />

              <View className="flex-1">
                <Text className="font-semibold text-text-primary dark:text-white">
                  {item.name}
                </Text>
                <Text className="text-sm font-medium text-primary mt-1">
                  ${item.price.toFixed(2)}
                </Text>

                <View className="flex-row items-center gap-3 mt-3">
                  <TouchableOpacity
                    onPress={() => updateQty(item.id, -1)}
                    className="h-7 w-7 rounded-full bg-slate-200 dark:bg-slate-700 items-center justify-center"
                  >
                    <Text className="text-lg text-text-primary dark:text-white">
                      −
                    </Text>
                  </TouchableOpacity>

                  <Text className="w-6 text-center text-base font-medium text-text-primary dark:text-white">
                    {item.qty}
                  </Text>

                  <TouchableOpacity
                    onPress={() => updateQty(item.id, 1)}
                    className="h-7 w-7 rounded-full bg-primary items-center justify-center"
                  >
                    <Text className="text-lg text-white">+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity onPress={() => removeItem(item.id)}>
                <Ionicons
                  name="trash-outline"
                  size={20}
                  color={isDark ? "#9ca3af" : "#6c757d"}
                />
              </TouchableOpacity>
            </View>
          ))}

        {/* ---------- EMPTY STATE ---------- */}
        {!loading && cart.length === 0 && (
          <View className="items-center justify-center mt-24 px-6">
            <Ionicons
              name="cart-outline"
              size={56}
              color={isDark ? "#9ca3af" : "#6c757d"}
            />
            <Text className="mt-4 text-lg font-semibold text-text-primary dark:text-white">
              Your cart is empty
            </Text>
            <Text className="mt-1 text-sm text-text-secondary text-center">
              Looks like you haven’t added anything yet.
            </Text>

            <TouchableOpacity
              onPress={() => router.push("/buy")}
              className="mt-6 h-12 px-6 rounded-lg bg-primary items-center justify-center"
            >
              <Text className="text-white font-bold text-base">
                Continue Shopping
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* ================= FOOTER ================= */}
      {!loading && cart.length > 0 && (
        <View className="border-t border-slate-200 dark:border-slate-700 bg-background-light dark:bg-background-dark px-4 py-4">
          <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-text-secondary">Subtotal</Text>
            <Text className="font-medium text-text-primary dark:text-white">
              ${subtotal.toFixed(2)}
            </Text>
          </View>

          <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-text-secondary">Shipping</Text>
            <Text className="font-medium text-text-primary dark:text-white">
              ${shipping.toFixed(2)}
            </Text>
          </View>

          <View className="border-t border-dashed border-slate-300 dark:border-slate-600 my-3" />

          <View className="flex-row justify-between mb-4">
            <Text className="font-semibold text-text-primary dark:text-white">
              Total
            </Text>
            <Text className="font-semibold text-text-primary dark:text-white">
              ${total.toFixed(2)}
            </Text>
          </View>

          <TouchableOpacity className="h-12 rounded-lg bg-primary items-center justify-center">
            <Text className="text-white font-bold text-base">
              Proceed to Checkout
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
