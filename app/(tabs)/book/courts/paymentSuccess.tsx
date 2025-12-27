import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* ================= MOCK DATA ================= */

const SUCCESS_DATA = {
  bookingId: "BKD123XYZ",
  activity: "Tennis Court",
  location: "City Sports Center",
  datetime: "Dec 26, 2025 • 04:00 PM",
  totalPaid: "$25.00",
  paymentMethod: "Visa •••• 1234",
};

/* ================= SCREEN ================= */

export default function BookingSuccessScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center gap-2 px-4 py-4">
        <TouchableOpacity onPress={() => router.replace("/(tabs)")}>
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
        contentContainerStyle={{ paddingBottom: 160 }}
        className="px-4"
      >
        {/* ================= SUCCESS ICON ================= */}
        <View className="items-center mt-6 mb-4">
          <View className="h-20 w-20 rounded-full bg-primary/20 items-center justify-center">
            <Ionicons name="checkmark" size={42} color="#0d59f2" />
          </View>
        </View>

        {/* ================= TITLE ================= */}
        <Text className="text-3xl font-bold text-text-primary dark:text-white text-center">
          Booking Confirmed!
        </Text>

        <Text className="mt-2 text-base text-text-secondary text-center">
          Your court is reserved. A confirmation has been sent to your email.
        </Text>

        {/* ================= BOOKING ID ================= */}
        <View className="mt-6 flex-row items-center justify-between rounded-xl bg-slate-200 dark:bg-slate-800/60 px-4 py-3">
          <Text className="text-sm font-medium text-text-secondary">
            Booking ID: {SUCCESS_DATA.bookingId}
          </Text>

          <Ionicons
            name="copy-outline"
            size={18}
            color={isDark ? "#9ca3af" : "#6c757d"}
          />
        </View>

        {/* ================= SUMMARY CARD ================= */}
        <View className="mt-6 rounded-2xl bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800">
          {/* -------- BOOKING DETAILS -------- */}
          <Text className="text-sm font-bold text-text-primary dark:text-white mb-4">
            Booking Details
          </Text>

          <InfoRow
            icon="tennisball-outline"
            label="Activity"
            value={SUCCESS_DATA.activity}
          />

          <InfoRow
            icon="location-outline"
            label="Location"
            value={SUCCESS_DATA.location}
          />

          <InfoRow
            icon="calendar-outline"
            label="Date & Time"
            value={SUCCESS_DATA.datetime}
          />

          <View className="h-px bg-slate-200 dark:bg-slate-700 my-4" />

          {/* -------- PAYMENT SUMMARY -------- */}
          <Text className="text-sm font-bold text-text-primary dark:text-white mb-4">
            Payment Summary
          </Text>

          <InfoRow
            icon="receipt-outline"
            label="Total Paid"
            value={SUCCESS_DATA.totalPaid}
          />

          <InfoRow
            icon="card-outline"
            label="Payment Method"
            value={SUCCESS_DATA.paymentMethod}
          />
        </View>
      </ScrollView>

      {/* ================= FOOTER ACTIONS ================= */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800">
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.replace("/book/bookings")}
          className="h-12 rounded-xl bg-primary items-center justify-center mb-3"
        >
          <Text className="text-white font-bold text-base">
            View My Bookings
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.replace("/book")}
          className="h-12 rounded-xl items-center justify-center"
        >
          <Text className="text-primary font-bold text-base">
            Return to Book
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ================= COMPONENT ================= */

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <View className="flex-row items-center gap-4 mb-4">
      <View className="h-10 w-10 rounded-lg bg-primary/20 items-center justify-center">
        <Ionicons name={icon} size={20} color="#0d59f2" />
      </View>

      <View className="flex-1">
        <Text className="text-xs text-text-secondary">{label}</Text>
        <Text className="text-base font-medium text-text-primary dark:text-white">
          {value}
        </Text>
      </View>
    </View>
  );
}
