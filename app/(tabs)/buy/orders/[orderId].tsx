import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* ================= MOCK DATA ================= */

const ORDER = {
  id: "2024-C7D1",
  date: "June 18, 2024",
  total: 125.5,
  status: "DELIVERED", // change to IN_TRANSIT to test
  items: [
    {
      id: "1",
      name: "Pro Tennis Racket",
      qty: 1,
      price: 85.5,
      image:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "2",
      name: "Running Shorts",
      qty: 1,
      price: 40,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
    },
  ],
};

/* ================= SCREEN ================= */

export default function OrderDetailScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";

  const isDelivered = ORDER.status === "DELIVERED";

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
          Order Details
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="px-4">
        {/* ================= SUMMARY ================= */}
        <View className="mb-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 p-4">
          <Text className="text-lg font-bold text-text-primary dark:text-white">
            Order #{ORDER.id}
          </Text>
          <Text className="text-sm text-text-secondary mt-1">
            Placed on {ORDER.date}
          </Text>
          <Text className="text-sm font-medium text-text-secondary mt-1">
            Total: ${ORDER.total.toFixed(2)}
          </Text>
        </View>

        {/* ================= ITEMS ================= */}
        <View className="mb-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 p-4">
          <Text className="text-lg font-bold text-text-primary dark:text-white mb-3">
            Items ({ORDER.items.length})
          </Text>

          {ORDER.items.map((item) => (
            <View key={item.id} className="flex-row items-center gap-4 mb-3">
              <Image
                source={{ uri: item.image }}
                className="h-14 w-14 rounded-lg"
              />

              <View className="flex-1">
                <Text
                  numberOfLines={1}
                  className="text-base font-medium text-text-primary dark:text-white"
                >
                  {item.name}
                </Text>
                <Text className="text-sm text-text-secondary">
                  Qty: {item.qty}
                </Text>
              </View>

              <Text className="text-base text-text-primary dark:text-white">
                ${item.price.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* ================= SHIPPING & PAYMENT ================= */}
        <View className="mb-6 rounded-xl bg-slate-100 dark:bg-slate-800/50 p-4">
          <Text className="text-lg font-bold text-text-primary dark:text-white mb-2">
            Shipping Address
          </Text>
          <Text className="text-sm text-text-secondary">
            Jane Doe{"\n"}
            123 Athlete Ave{"\n"}
            Sportsville, SP 90210
          </Text>

          <View className="border-t border-slate-300 dark:border-slate-600 my-4" />

          <Text className="text-lg font-bold text-text-primary dark:text-white mb-2">
            Payment Method
          </Text>
          <Text className="text-sm text-text-secondary">
            Visa ending in 4242
          </Text>
        </View>

        {/* ================= ACTIONS ================= */}
        {!isDelivered ? (
          <TouchableOpacity className="h-12 rounded-lg bg-primary items-center justify-center mb-3">
            <Text className="text-white font-bold text-base">Track Order</Text>
          </TouchableOpacity>
        ) : (
          <View className="h-12 rounded-lg bg-emerald-500/20 items-center justify-center mb-3">
            <Text className="text-emerald-600 dark:text-emerald-400 font-bold text-base">
              Delivered
            </Text>
          </View>
        )}

        <TouchableOpacity className="h-12 rounded-lg bg-primary/20 items-center justify-center mb-4">
          <Text className="text-primary font-bold text-base">
            Contact Support
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
