import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

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
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<typeof INITIAL_CART>([]);

  useEffect(() => {
    const t = setTimeout(() => {
      setCart(INITIAL_CART); // set [] to test empty state
      setLoading(false);
    }, 1200);
    return () => clearTimeout(t);
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
    <ScreenWrapper>
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center gap-3 px-4 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={iconColor} />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
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
              className="mb-4 h-24 rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border"
            />
          ))}

        {/* ---------- CART ITEMS ---------- */}
        {!loading &&
          cart.map((item) => (
            <View
              key={item.id}
              className="flex-row items-center gap-4 mb-4 rounded-xl bg-light-card dark:bg-dark-card p-3 border border-light-border dark:border-dark-border"
            >
              <Image
                source={{ uri: item.image }}
                className="h-20 w-20 rounded-lg"
              />

              <View className="flex-1">
                <Text className="font-semibold text-light-text dark:text-dark-text">
                  {item.name}
                </Text>

                <Text className="text-sm font-medium text-primary mt-1">
                  ${item.price.toFixed(2)}
                </Text>

                <View className="flex-row items-center gap-3 mt-3">
                  <TouchableOpacity
                    onPress={() => updateQty(item.id, -1)}
                    className="h-7 w-7 rounded-full bg-light-border dark:bg-dark-border items-center justify-center"
                  >
                    <Text className="text-lg text-light-text dark:text-dark-text">
                      −
                    </Text>
                  </TouchableOpacity>

                  <Text className="w-6 text-center text-base font-medium text-light-text dark:text-dark-text">
                    {item.qty}
                  </Text>

                  <TouchableOpacity
                    onPress={() => updateQty(item.id, 1)}
                    className="h-7 w-7 rounded-full bg-primary items-center justify-center"
                  >
                    <Text className="text-lg text-black">+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity onPress={() => removeItem(item.id)}>
                <Ionicons name="trash-outline" size={20} color={iconColor} />
              </TouchableOpacity>
            </View>
          ))}

        {/* ---------- EMPTY STATE ---------- */}
        {!loading && cart.length === 0 && (
          <View className="items-center justify-center mt-24 px-6">
            <Ionicons name="cart-outline" size={56} color={iconColor} />
            <Text className="mt-4 text-lg font-semibold text-light-text dark:text-dark-text">
              Your cart is empty
            </Text>
            <Text className="mt-1 text-sm text-light-muted dark:text-dark-muted text-center">
              Looks like you haven’t added anything yet.
            </Text>

            <TouchableOpacity
              onPress={() => router.push("/buy")}
              className="mt-6 h-12 px-6 rounded-lg bg-primary items-center justify-center"
            >
              <Text className="text-black font-medium text-base">
                Continue Shopping
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* ================= FOOTER ================= */}
      {!loading && cart.length > 0 && (
        <View className="border-t border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg px-4 py-4">
          <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-light-muted dark:text-dark-muted">
              Subtotal
            </Text>
            <Text className="font-medium text-light-text dark:text-dark-text">
              ${subtotal.toFixed(2)}
            </Text>
          </View>

          <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-light-muted dark:text-dark-muted">
              Shipping
            </Text>
            <Text className="font-medium text-light-text dark:text-dark-text">
              ${shipping.toFixed(2)}
            </Text>
          </View>

          <View className="h-px bg-light-border dark:bg-dark-border my-3" />

          <View className="flex-row justify-between mb-4">
            <Text className="font-semibold text-light-text dark:text-dark-text">
              Total
            </Text>
            <Text className="font-semibold text-light-text dark:text-dark-text">
              ${total.toFixed(2)}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => Alert.alert("Going to checkout")}
            className="h-12 rounded-lg bg-primary items-center justify-center"
          >
            <Text className="text-black font-medium text-base">
              Proceed to Checkout
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScreenWrapper>
  );
}
