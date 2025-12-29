import ScreenWrapper from "@/components/ScreenWrapper";
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
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";

  const [selectedMethod, setSelectedMethod] = useState("scash");

  const total = BOOKING_DATA.subtotal + BOOKING_DATA.fees;

  return (
    <ScreenWrapper>
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center gap-3 px-4 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={iconColor} />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
          Payment
        </Text>
      </View>

      {/* ================= CONTENT ================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
        className="px-4"
      >
        {/* ================= TITLE ================= */}
        <Text className="text-2xl font-bold text-light-text dark:text-dark-text mt-2 mb-4">
          Confirm & Pay
        </Text>

        {/* ================= BOOKING SUMMARY ================= */}
        <View className="rounded-2xl bg-light-card dark:bg-dark-card p-4 border border-light-border dark:border-dark-border">
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
        <Text className="text-lg font-bold text-light-text dark:text-dark-text mt-8 mb-3">
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
                    : "border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card"
                }`}
              >
                <View className="flex-row items-center gap-4">
                  <View
                    className={`h-11 w-11 rounded-full items-center justify-center ${
                      selected
                        ? "bg-primary/20"
                        : "bg-light-border dark:bg-dark-border"
                    }`}
                  >
                    <Ionicons
                      name={method.icon as any}
                      size={22}
                      color={selected ? "#8AFF1A" : iconColor}
                    />
                  </View>

                  <View>
                    <Text className="text-base font-semibold text-light-text dark:text-dark-text">
                      {method.label}
                    </Text>
                    <Text className="text-sm text-light-muted dark:text-dark-muted">
                      {method.subtitle}
                    </Text>
                  </View>
                </View>

                <View
                  className={`h-6 w-6 rounded-full border-2 items-center justify-center ${
                    selected
                      ? "border-primary bg-primary"
                      : "border-light-muted dark:border-dark-muted"
                  }`}
                >
                  {selected && (
                    <Ionicons name="checkmark" size={14} color="#000000" />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}

          {/* ================= ADD NEW CARD ================= */}
          <TouchableOpacity
            activeOpacity={0.85}
            className="flex-row items-center justify-between rounded-2xl p-4 border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card"
          >
            <View className="flex-row items-center gap-4">
              <View className="h-11 w-11 rounded-full bg-light-border dark:bg-dark-border items-center justify-center">
                <Ionicons name="add-outline" size={22} color={iconColor} />
              </View>

              <Text className="text-base font-semibold text-light-text dark:text-dark-text">
                Add new card
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color={iconColor} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ================= FOOTER ================= */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border">
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.push("/book/courts/paymentSuccess")}
          className="h-14 rounded-xl bg-primary items-center justify-center"
        >
          <Text className="text-black text-base font-medium">
            Pay ${total.toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
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
            ? "text-base font-bold text-light-text dark:text-dark-text"
            : "text-sm text-light-muted dark:text-dark-muted"
        }
      >
        {label}
      </Text>
      <Text
        className={
          bold
            ? "text-base font-bold text-light-text dark:text-dark-text"
            : "text-sm font-medium text-light-text dark:text-dark-text"
        }
      >
        {value}
      </Text>
    </View>
  );
}

function Divider() {
  return <View className="h-px bg-light-border dark:bg-dark-border my-3" />;
}
