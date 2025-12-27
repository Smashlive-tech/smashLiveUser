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
import { SafeAreaView } from "react-native-safe-area-context";

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

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  /* ================= FAKE API ================= */
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setOrders(MOCK_ORDERS); // change to [] to test empty state
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

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
        {!loading && orders.length === 0 && <EmptyOrders />}
      </ScrollView>
    </SafeAreaView>
  );
}

/* ================= COMPONENTS ================= */

function OrderCard({ order, onView }: { order: Order; onView: () => void }) {
  const isDark = useColorScheme() === "dark";

  const statusConfig = {
    IN_TRANSIT: {
      container: isDark ? "bg-sky-500/20" : "bg-primary/20",
      text: isDark ? "text-sky-300" : "text-primary",
      dot: isDark ? "bg-sky-300" : "bg-primary",
      label: "In Transit",
    },
    DELIVERED: {
      container: "bg-emerald-500/20",
      text: "text-emerald-600 dark:text-emerald-400",
      dot: "bg-emerald-500",
      label: "Delivered",
    },
    CANCELLED: {
      container: "bg-red-500/20",
      text: "text-red-600 dark:text-red-400",
      dot: "bg-red-500",
      label: "Cancelled",
    },
  };

  const status = statusConfig[order.status];

  return (
    <View className="mb-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 p-4 shadow-sm">
      <View className="flex-row justify-between gap-4">
        <View>
          <Text className="font-bold text-text-primary dark:text-white">
            Order #{order.id}
          </Text>
          <Text className="text-sm text-text-secondary">{order.date}</Text>
          <Text className="text-sm font-medium text-text-secondary mt-1">
            ${order.amount.toFixed(2)}
          </Text>
        </View>

        {/* STATUS BADGE */}
        <View
          className={`flex-row items-center gap-2 rounded-full px-3 py-1 ${status.container}`}
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
          className="flex-1 h-10 rounded-lg bg-slate-200 dark:bg-slate-700 items-center justify-center"
        >
          <Text className="text-sm font-medium text-text-primary dark:text-white">
            View Details
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function EmptyOrders() {
  return (
    <View className="items-center justify-center mt-20 px-6">
      <View className="h-16 w-16 rounded-full bg-slate-200 dark:bg-slate-800 items-center justify-center">
        <Ionicons name="receipt-outline" size={32} color="#6c757d" />
      </View>

      <Text className="mt-4 text-lg font-bold text-text-primary dark:text-white">
        No Orders Yet
      </Text>
      <Text className="mt-1 text-sm text-text-secondary text-center">
        Your past and current orders will appear here.
      </Text>

      <TouchableOpacity className="mt-6 h-12 px-6 rounded-lg bg-primary items-center justify-center">
        <Text className="text-white font-bold text-base">Shop Gear</Text>
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
          className="mb-4 h-32 rounded-xl bg-slate-200 dark:bg-slate-700"
        />
      ))}
    </>
  );
}
