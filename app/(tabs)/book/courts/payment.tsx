import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* ================= MOCK DATA ================= */

const BOOKING_DATA = {
  court: "Grand Park Arena - Court 3",
  datetime: "Dec 26, 2025 • 02:00 PM - 03:00 PM",
  subtotal: 45.0,
  fees: 2.5,
};

const PAYMENT_METHODS = [
  {
    id: "scash",
    label: "S-Cash",
    subtitle: "Balance: $120.50",
    icon: "wallet-outline",
  },
  {
    id: "card",
    label: "Visa •••• 1234",
    subtitle: "Expires 08/26",
    icon: "card-outline",
  },
];

/* ================= SCREEN ================= */

export default function PaymentScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";

  const [selectedMethod, setSelectedMethod] = useState("scash");

  const total = BOOKING_DATA.subtotal + BOOKING_DATA.fees;

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
          Book
        </Text>
      </View>

      {/* ================= CONTENT ================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
        className="px-4"
      >
        {/* ================= TITLE ================= */}
        <Text className="text-2xl font-bold text-text-primary dark:text-white mt-2 mb-4">
          Confirm & Pay
        </Text>

        {/* ================= BOOKING SUMMARY ================= */}
        <View className="rounded-2xl bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800">
          <SummaryRow label="Court" value={BOOKING_DATA.court} />
          <SummaryRow label="Date & Time" value={BOOKING_DATA.datetime} />

          <Divider />

          <SummaryRow
            label="Subtotal"
            value={`$${BOOKING_DATA.subtotal.toFixed(2)}`}
          />
          <SummaryRow label="Fees" value={`$${BOOKING_DATA.fees.toFixed(2)}`} />

          <Divider />

          <SummaryRow label="Total" value={`$${total.toFixed(2)}`} bold />
        </View>

        {/* ================= PAYMENT METHODS ================= */}
        <Text className="text-lg font-bold text-text-primary dark:text-white mt-8 mb-3">
          Select Payment Method
        </Text>

        <View className="gap-3">
          {PAYMENT_METHODS.map((method) => {
            const selected = selectedMethod === method.id;

            return (
              <TouchableOpacity
                key={method.id}
                activeOpacity={0.85}
                onPress={() => setSelectedMethod(method.id)}
                className={`flex-row items-center justify-between rounded-2xl p-4 border ${
                  selected
                    ? "border-primary bg-primary/10"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                }`}
              >
                <View className="flex-row items-center gap-4">
                  <View
                    className={`h-11 w-11 rounded-full items-center justify-center ${
                      selected
                        ? "bg-primary/20"
                        : "bg-slate-200 dark:bg-slate-800"
                    }`}
                  >
                    <Ionicons
                      name={method.icon as any}
                      size={22}
                      color={
                        selected ? "#0d59f2" : isDark ? "#9ca3af" : "#6c757d"
                      }
                    />
                  </View>

                  <View>
                    <Text className="text-base font-semibold text-text-primary dark:text-white">
                      {method.label}
                    </Text>
                    <Text className="text-sm text-text-secondary">
                      {method.subtitle}
                    </Text>
                  </View>
                </View>

                <View
                  className={`h-6 w-6 rounded-full border-2 items-center justify-center ${
                    selected ? "border-primary bg-primary" : "border-slate-400"
                  }`}
                >
                  {selected && (
                    <Ionicons name="checkmark" size={14} color="#ffffff" />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}

          {/* Add new card */}
          <TouchableOpacity
            activeOpacity={0.85}
            className="flex-row items-center justify-between rounded-2xl p-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
          >
            <View className="flex-row items-center gap-4">
              <View className="h-11 w-11 rounded-full bg-slate-200 dark:bg-slate-800 items-center justify-center">
                <Ionicons
                  name="add-outline"
                  size={22}
                  color={isDark ? "#9ca3af" : "#6c757d"}
                />
              </View>

              <Text className="text-base font-semibold text-text-primary dark:text-white">
                Add new card
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={isDark ? "#9ca3af" : "#6c757d"}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ================= FOOTER ================= */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800">
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.push("/book/courts/paymentSuccess")}
          className="h-14 rounded-xl bg-primary items-center justify-center"
        >
          <Text className="text-white text-base font-bold">
            Pay ${total.toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ================= COMPONENTS ================= */

function SummaryRow({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <View className="flex-row justify-between items-center py-2">
      <Text
        className={
          bold
            ? "text-base font-bold text-text-primary dark:text-white"
            : "text-sm text-text-secondary"
        }
      >
        {label}
      </Text>
      <Text
        className={
          bold
            ? "text-base font-bold text-text-primary dark:text-white"
            : "text-sm font-medium text-text-primary dark:text-white"
        }
      >
        {value}
      </Text>
    </View>
  );
}

function Divider() {
  return <View className="h-px bg-slate-200 dark:bg-slate-700 my-3" />;
}
