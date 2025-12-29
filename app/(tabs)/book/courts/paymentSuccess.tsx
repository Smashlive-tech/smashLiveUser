import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

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
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";

  return (
    <ScreenWrapper>
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center gap-3 px-4 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={iconColor} />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
          Success
        </Text>
      </View>

      {/* ================= CONTENT ================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 160 }}
        className="px-4"
      >
        {/* ================= SUCCESS ICON ================= */}
        <View className="items-center mt-8 mb-4">
          <View className="h-20 w-20 rounded-full bg-primary/20 items-center justify-center">
            <Ionicons name="checkmark" size={42} color="#8AFF1A" />
          </View>
        </View>

        {/* ================= TITLE ================= */}
        <Text className="text-3xl font-bold text-light-text dark:text-dark-text text-center">
          Booking Confirmed!
        </Text>

        <Text className="mt-2 text-base text-light-muted dark:text-dark-muted text-center">
          Your court is reserved. A confirmation has been sent to your email.
        </Text>

        {/* ================= BOOKING ID ================= */}
        <View className="mt-6 flex-row items-center justify-between rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border px-4 py-3">
          <Text className="text-sm font-medium text-light-muted dark:text-dark-muted">
            Booking ID: {SUCCESS_DATA.bookingId}
          </Text>

          <Ionicons name="copy-outline" size={18} color={iconColor} />
        </View>

        {/* ================= SUMMARY CARD ================= */}
        <View className="mt-6 rounded-2xl bg-light-card dark:bg-dark-card p-4 border border-light-border dark:border-dark-border">
          {/* -------- BOOKING DETAILS -------- */}
          <Text className="text-sm font-bold text-light-text dark:text-dark-text mb-4">
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

          <Divider />

          {/* -------- PAYMENT SUMMARY -------- */}
          <Text className="text-sm font-bold text-light-text dark:text-dark-text mb-4">
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
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border">
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.replace("/book/bookings")}
          className="h-12 rounded-xl bg-primary items-center justify-center mb-3"
        >
          <Text className="text-black font-medium text-base">
            View My Bookings
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.replace("/book")}
          className="h-12 rounded-xl items-center justify-center"
        >
          <Text className="text-primary font-medium text-base">
            Return to Book
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}

/* ================= COMPONENTS ================= */

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
        <Ionicons name={icon} size={20} color="#8AFF1A" />
      </View>

      <View className="flex-1">
        <Text className="text-xs text-light-muted dark:text-dark-muted">
          {label}
        </Text>
        <Text className="text-base font-medium text-light-text dark:text-dark-text">
          {value}
        </Text>
      </View>
    </View>
  );
}

function Divider() {
  return <View className="h-px bg-light-border dark:bg-dark-border my-4" />;
}
