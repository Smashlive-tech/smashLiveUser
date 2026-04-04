import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

/* ================= SCREEN ================= */

export default function BookingReviewScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";

  const { date, time, type } = useLocalSearchParams<{
    date: string;
    time?: string;
    type?: string;
  }>();

  const formattedDate = new Date(date).toDateString();

  const displayDateTime =
    type === "corporate"
      ? `${formattedDate} • Full Day (06:00 AM - 10:00 PM)`
      : `${formattedDate} • ${time}`;

  const bookingTypeLabel =
    type === "corporate" ? "Corporate Pass" : "Slot Booking";

  return (
    <ScreenWrapper>
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center gap-3 px-4 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={iconColor} />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
          Review Booking
        </Text>
      </View>

      {/* ================= CONTENT ================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        className="px-4"
      >
        {/* ================= VENUE CARD ================= */}
        <View className="mt-2 rounded-2xl bg-light-card dark:bg-dark-card p-4 border border-light-border dark:border-dark-border flex-row gap-4">
          <View className="flex-1 justify-center">
            <Text className="text-lg font-bold text-light-text dark:text-dark-text">
              Grand Slam Arena
            </Text>
            <Text className="text-sm text-light-muted dark:text-dark-muted mt-1">
              123 Tennis Pro Lane, Sportsville
            </Text>
          </View>

          <View className="w-24 h-24 rounded-xl bg-light-border dark:bg-dark-border" />
        </View>

        {/* ================= BOOKING DETAILS ================= */}
        <View className="mt-6 rounded-2xl bg-light-card dark:bg-dark-card p-4 border border-light-border dark:border-dark-border">
          {/* 🔥 Booking Type instead of Court Type */}
          <DetailRow
            icon="pricetag-outline"
            title="Booking Type"
            value={bookingTypeLabel}
          />

          <Divider />

          {/* 🔥 Dynamic Date Time */}
          <DetailRow
            icon="calendar-outline"
            title="Date & Time"
            value={displayDateTime}
          />
        </View>

        {/* ================= PRICE SUMMARY ================= */}
        <View className="mt-6 rounded-2xl bg-light-card dark:bg-dark-card p-4 border border-light-border dark:border-dark-border">
          <Text className="text-lg font-bold text-light-text dark:text-dark-text mb-4">
            Price Summary
          </Text>

          {/* 🔥 Static now → API later */}
          <PriceRow label="Court Rental Fee" value="$45.00" />
          <PriceRow label="Service Fee & Taxes" value="$5.85" />

          <Divider full />

          <PriceRow label="Total Amount" value="$50.85" bold />
        </View>
        {/* ================= PAY BUTTON ================= */}
        <View className="mt-6 mb-5">
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
              // 👉 later replace with Razorpay
              router.push("/book/courts/paymentSuccess");
            }}
            className="h-14 rounded-2xl bg-primary items-center justify-center shadow-lg"
          >
            <Text className="text-black text-base font-semibold">
              Pay $50.85
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
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
      <View className="h-12 w-12 rounded-xl bg-primary/10 items-center justify-center">
        <Ionicons name={icon} size={22} color="#8AFF1A" />
      </View>

      <View className="flex-1">
        <Text className="text-base font-semibold text-light-text dark:text-dark-text">
          {title}
        </Text>
        <Text className="text-sm text-light-muted dark:text-dark-muted mt-1">
          {value}
        </Text>
      </View>
    </View>
  );
}

function Divider({ full }: { full?: boolean }) {
  return (
    <View
      className={`h-px ${
        full ? "my-4" : "mx-16"
      } bg-light-border dark:bg-dark-border`}
    />
  );
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
            : "text-sm font-medium text-light-muted dark:text-dark-muted"
        }
      >
        {value}
      </Text>
    </View>
  );
}
