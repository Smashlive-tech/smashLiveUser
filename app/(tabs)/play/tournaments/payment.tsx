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
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentSummaryScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9ca3af" : "#6c757d";

  const TOTAL = 52.25;

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center gap-3 px-4 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={iconColor} />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-text-primary dark:text-white">
          Play
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* ================= TITLE ================= */}
        <View className="px-4 pt-4 pb-2">
          <Text className="text-[28px] font-bold text-center text-text-primary dark:text-white">
            Payment Summary
          </Text>
        </View>

        {/* ================= SUMMARY CARD ================= */}
        <View className="px-4 pt-4">
          <View className="rounded-xl bg-white dark:bg-slate-900/40 p-4 border border-slate-200 dark:border-slate-700">
            <PriceRow label="Tournament Registration Fee" value="$45.00" />
            <PriceRow label="Processing Fee" value="$2.50" />
            <PriceRow label="Taxes & Surcharges" value="$4.75" />

            <View className="my-3 h-px bg-slate-200 dark:bg-slate-700" />

            <PriceRow
              label="Total Amount"
              value={`$${TOTAL.toFixed(2)}`}
              bold
            />
          </View>
        </View>

        {/* ================= PAYMENT METHOD ================= */}
        <View className="px-4 pt-6">
          <View className="rounded-xl bg-white dark:bg-slate-900/40 p-4 border border-slate-200 dark:border-slate-700 flex-row items-center justify-between">
            <View className="flex-row items-center gap-4">
              <View className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-800 items-center justify-center">
                <Ionicons name="wallet-outline" size={20} color={iconColor} />
              </View>

              <View>
                <Text className="text-sm text-text-secondary">Pay using</Text>
                <Text className="text-base font-medium text-text-primary dark:text-white">
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
      <View className="absolute bottom-0 left-0 right-0 bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 px-4 py-4">
        <TouchableOpacity
          onPress={() => Alert.alert("Payment Success")}
          className="h-14 rounded-xl bg-primary items-center justify-center"
        >
          <Text className="text-white text-base font-bold">
            Confirm & Pay ${TOTAL.toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
            ? "font-bold text-text-primary dark:text-white"
            : "text-text-secondary"
        }`}
      >
        {label}
      </Text>

      <Text
        className={`text-base ${
          bold
            ? "font-bold text-text-primary dark:text-white"
            : "font-medium text-text-primary dark:text-white"
        }`}
      >
        {value}
      </Text>
    </View>
  );
}
