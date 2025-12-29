import ScreenWrapper from "@/components/ScreenWrapper";
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

/* ================= MOCK DATA ================= */

const ORDER = {
  id: "2024-C7D1",
  date: "June 18, 2024",
  total: 125.5,
  status: "DELIVERED", // IN_TRANSIT | DELIVERED
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
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";

  const isDelivered = ORDER.status === "DELIVERED";

  return (
    <ScreenWrapper>
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center gap-3 px-4 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={iconColor} />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
          Order Details
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="px-4">
        {/* ================= SUMMARY ================= */}
        <View className="mb-4 rounded-xl bg-light-card dark:bg-dark-card p-4 border border-light-border dark:border-dark-border">
          <Text className="text-lg font-bold text-light-text dark:text-dark-text">
            Order #{ORDER.id}
          </Text>
          <Text className="text-sm text-light-muted dark:text-dark-muted mt-1">
            Placed on {ORDER.date}
          </Text>
          <Text className="text-sm font-medium text-light-muted dark:text-dark-muted mt-1">
            Total: ${ORDER.total.toFixed(2)}
          </Text>
        </View>

        {/* ================= ITEMS ================= */}
        <View className="mb-4 rounded-xl bg-light-card dark:bg-dark-card p-4 border border-light-border dark:border-dark-border">
          <Text className="text-lg font-bold text-light-text dark:text-dark-text mb-3">
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
                  className="text-base font-medium text-light-text dark:text-dark-text"
                >
                  {item.name}
                </Text>
                <Text className="text-sm text-light-muted dark:text-dark-muted">
                  Qty: {item.qty}
                </Text>
              </View>

              <Text className="text-base text-light-text dark:text-dark-text">
                ${item.price.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* ================= SHIPPING & PAYMENT ================= */}
        <View className="mb-6 rounded-xl bg-light-card dark:bg-dark-card p-4 border border-light-border dark:border-dark-border">
          <Text className="text-lg font-bold text-light-text dark:text-dark-text mb-2">
            Shipping Address
          </Text>
          <Text className="text-sm text-light-muted dark:text-dark-muted">
            Jane Doe{"\n"}
            123 Athlete Ave{"\n"}
            Sportsville, SP 90210
          </Text>

          <View className="h-px bg-light-border dark:bg-dark-border my-4" />

          <Text className="text-lg font-bold text-light-text dark:text-dark-text mb-2">
            Payment Method
          </Text>
          <Text className="text-sm text-light-muted dark:text-dark-muted">
            Visa ending in 4242
          </Text>
        </View>

        {/* ================= ACTIONS ================= */}
        {!isDelivered ? (
          <TouchableOpacity className="h-12 rounded-lg bg-primary items-center justify-center mb-3">
            <Text className="text-black font-medium text-base">
              Track Order
            </Text>
          </TouchableOpacity>
        ) : (
          <View className="h-12 rounded-lg bg-primary items-center justify-center mb-3">
            <Text className="text-black font-bold text-base">Delivered</Text>
          </View>
        )}

        <TouchableOpacity className="h-12 rounded-lg bg-primary/15 items-center justify-center mb-4">
          <Text className="text-primary font-medium text-base">
            Contact Support
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper>
  );
}
