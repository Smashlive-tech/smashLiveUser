import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

/* ================= TYPES ================= */

type OrderStatus = "IN_TRANSIT" | "DELIVERED" | "CANCELLED";

type Order = {
  id: string;
  date: string;
  amount: number;
  status: OrderStatus;
};

/* ================= MOCK DATA ================= */

const MOCK_ORDERS: Order[] = [
  {
    id: "2024-C7D1",
    date: "June 18, 2024",
    amount: 124.5,
    status: "IN_TRANSIT",
  },
  {
    id: "2024-A4B8",
    date: "June 15, 2024",
    amount: 89.99,
    status: "DELIVERED",
  },
  {
    id: "2024-E2F5",
    date: "May 2, 2024",
    amount: 215,
    status: "CANCELLED",
  },
];

/* ================= SCREEN ================= */

export default function OrdersScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const t = setTimeout(() => {
      setOrders(MOCK_ORDERS); // set [] to test empty state
      setLoading(false);
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <ScreenWrapper>
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center gap-3 px-4 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={iconColor} />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
          Orders
        </Text>
      </View>

      {/* ================= CONTENT ================= */}
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-4">
        {/* ---------- LOADING ---------- */}
        {loading && <OrdersSkeleton />}

        {/* ---------- ORDERS ---------- */}
        {!loading &&
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onView={() => router.push(`/buy/orders/${order.id}`)}
            />
          ))}

        {/* ---------- EMPTY STATE ---------- */}
        {!loading && orders.length === 0 && (
          <EmptyOrders onShop={() => router.push("/buy")} />
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}

/* ================= COMPONENTS ================= */

function OrderCard({ order, onView }: { order: Order; onView: () => void }) {
  const statusMap = {
    IN_TRANSIT: {
      label: "In Transit",
      bg: "bg-primary/15",
      text: "text-primary",
      dot: "bg-primary",
    },
    DELIVERED: {
      label: "Delivered",
      bg: "bg-light-border dark:bg-dark-border",
      text: "text-light-text dark:text-dark-text",
      dot: "bg-light-muted dark:bg-dark-muted",
    },
    CANCELLED: {
      label: "Cancelled",
      bg: "bg-light-border dark:bg-dark-border",
      text: "text-light-muted dark:text-dark-muted",
      dot: "bg-light-muted dark:bg-dark-muted",
    },
  };

  const status = statusMap[order.status];

  return (
    <View className="mb-4 rounded-xl bg-light-card dark:bg-dark-card p-4 border border-light-border dark:border-dark-border">
      <View className="flex-row justify-between gap-4">
        <View>
          <Text className="font-bold text-light-text dark:text-dark-text">
            Order #{order.id}
          </Text>
          <Text className="text-sm text-light-muted dark:text-dark-muted">
            {order.date}
          </Text>
          <Text className="text-sm font-medium text-light-muted dark:text-dark-muted mt-1">
            ${order.amount.toFixed(2)}
          </Text>
        </View>

        {/* STATUS BADGE */}
        <View
          className={`flex-row items-center gap-2 rounded-full px-3 py-1 ${status.bg}`}
        >
          <View className={`h-2 w-2 rounded-full ${status.dot}`} />
          <Text className={`text-xs font-medium ${status.text}`}>
            {status.label}
          </Text>
        </View>
      </View>

      <View className="flex-row gap-3 mt-4">
        <TouchableOpacity
          onPress={onView}
          className="flex-1 h-10 rounded-lg bg-primary items-center justify-center"
        >
          <Text className="text-sm font-bold text-black">View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function EmptyOrders({ onShop }: { onShop: () => void }) {
  return (
    <View className="items-center justify-center mt-20 px-6">
      <View className="h-16 w-16 rounded-full bg-light-border dark:bg-dark-border items-center justify-center">
        <Ionicons name="receipt-outline" size={32} color="#6B7280" />
      </View>

      <Text className="mt-4 text-lg font-bold text-light-text dark:text-dark-text">
        No Orders Yet
      </Text>
      <Text className="mt-1 text-sm text-light-muted dark:text-dark-muted text-center">
        Your past and current orders will appear here.
      </Text>

      <TouchableOpacity
        onPress={onShop}
        className="mt-6 h-12 px-6 rounded-lg bg-primary items-center justify-center"
      >
        <Text className="text-black font-medium text-base">Shop Gear</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ================= SKELETON ================= */

function OrdersSkeleton() {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <View
          key={i}
          className="mb-4 h-32 rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border"
        />
      ))}
    </>
  );
}
