import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

export default function PaymentSummaryScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";

  const TOTAL = 52.25;

  return (
    <ScreenWrapper>
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center gap-3 px-4 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={iconColor} />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
          Play
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* ================= TITLE ================= */}
        <View className="px-4 pt-4 pb-2">
          <Text className="text-[28px] font-bold text-center text-light-text dark:text-dark-text">
            Payment Summary
          </Text>
        </View>

        {/* ================= SUMMARY CARD ================= */}
        <View className="px-4 pt-4">
          <View className="rounded-xl bg-light-card dark:bg-dark-card p-4 border border-light-border dark:border-dark-border">
            <PriceRow label="Tournament Registration Fee" value="$45.00" />
            <PriceRow label="Processing Fee" value="$2.50" />
            <PriceRow label="Taxes & Surcharges" value="$4.75" />

            <View className="my-3 h-px bg-light-border dark:bg-dark-border" />

            <PriceRow
              label="Total Amount"
              value={`$${TOTAL.toFixed(2)}`}
              bold
            />
          </View>
        </View>

        {/* ================= PAYMENT METHOD ================= */}
        <View className="px-4 pt-6">
          <View className="rounded-xl bg-light-card dark:bg-dark-card p-4 border border-light-border dark:border-dark-border flex-row items-center justify-between">
            <View className="flex-row items-center gap-4">
              <View className="h-10 w-10 rounded-lg bg-primary/10 items-center justify-center">
                <Ionicons name="wallet-outline" size={20} color={iconColor} />
              </View>

              <View>
                <Text className="text-sm text-light-muted dark:text-dark-muted">
                  Pay using
                </Text>
                <Text className="text-base font-medium text-light-text dark:text-dark-text">
                  Wallet / Card
                </Text>
              </View>
            </View>

            <TouchableOpacity>
              <Text className="text-primary font-medium">Change</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* ================= STICKY CTA ================= */}
      <View className="absolute bottom-0 left-0 right-0 bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border px-4 py-4">
        <TouchableOpacity
          onPress={() => Alert.alert("Payment Success")}
          className="h-14 rounded-xl bg-primary items-center justify-center"
        >
          <Text className="text-black text-base font-bold">
            Confirm & Pay ${TOTAL.toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}

/* ================= PRICE ROW ================= */

function PriceRow({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <View className="flex-row justify-between py-2">
      <Text
        className={`text-base ${
          bold
            ? "font-bold text-light-text dark:text-dark-text"
            : "text-light-muted dark:text-dark-muted"
        }`}
      >
        {label}
      </Text>

      <Text
        className={`text-base ${
          bold
            ? "font-bold text-light-text dark:text-dark-text"
            : "font-medium text-light-text dark:text-dark-text"
        }`}
      >
        {value}
      </Text>
    </View>
  );
}
