import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BookingReviewScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";

  const { date, time } = useLocalSearchParams<{
    date: string;
    time: string;
  }>();

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
        {/* ================= VENUE CARD ================= */}
        <View className="mt-2 rounded-2xl bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800 flex-row gap-4">
          <View className="flex-1 justify-center">
            <Text className="text-lg font-bold text-text-primary dark:text-white">
              Grand Slam Arena
            </Text>
            <Text className="text-sm text-text-secondary mt-1">
              123 Tennis Pro Lane, Sportsville
            </Text>
          </View>

          {/* Image placeholder */}
          <View className="w-24 h-24 rounded-xl bg-slate-200 dark:bg-slate-700" />
        </View>

        {/* ================= BOOKING DETAILS ================= */}
        <View className="mt-6 rounded-2xl bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800">
          <DetailRow
            icon="tennisball-outline"
            title="Court Type"
            value="Indoor Hard Court"
          />

          <Divider />

          <DetailRow
            icon="calendar-outline"
            title="Date & Time"
            value={`${new Date(date).toDateString()} • ${time}`}
          />

          <Divider />

          <DetailRow
            icon="people-outline"
            title="Players"
            value="Alex Williams (Host), Jane Doe"
          />
        </View>

        {/* ================= PRICE SUMMARY ================= */}
        <View className="mt-6 rounded-2xl bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800">
          <Text className="text-lg font-bold text-text-primary dark:text-white mb-4">
            Price Summary
          </Text>

          <PriceRow label="Court Rental Fee" value="$45.00" />
          <PriceRow label="Service Fee & Taxes" value="$5.85" />

          <View className="my-4 h-px bg-slate-200 dark:bg-slate-700" />

          <PriceRow label="Total Amount" value="$50.85" bold />
        </View>
      </ScrollView>

      {/* ================= FOOTER ================= */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800">
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => {
            router.push("/book/courts/payment");
          }}
          className="h-14 rounded-xl bg-primary items-center justify-center"
        >
          <Text className="text-white text-base font-bold">
            Confirm Booking
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ================= COMPONENTS ================= */

function DetailRow({
  icon,
  title,
  value,
}: {
  icon: any;
  title: string;
  value: string;
}) {
  return (
    <View className="flex-row items-center gap-4 py-4">
      <View className="h-12 w-12 rounded-xl bg-primary/10 dark:bg-primary/20 items-center justify-center">
        <Ionicons name={icon} size={22} color="#0d59f2" />
      </View>

      <View className="flex-1">
        <Text className="text-base font-semibold text-text-primary dark:text-white">
          {title}
        </Text>
        <Text className="text-sm text-text-secondary mt-1">{value}</Text>
      </View>
    </View>
  );
}

function Divider() {
  return <View className="h-px bg-slate-200 dark:bg-slate-700 mx-16" />;
}

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
    <View className="flex-row justify-between items-center mb-3">
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
            : "text-sm font-medium text-text-secondary"
        }
      >
        {value}
      </Text>
    </View>
  );
}
