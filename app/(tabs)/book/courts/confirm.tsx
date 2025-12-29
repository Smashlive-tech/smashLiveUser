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

  const { date, time } = useLocalSearchParams<{
    date: string;
    time: string;
  }>();

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
        contentContainerStyle={{ paddingBottom: 140 }}
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
        <View className="mt-6 rounded-2xl bg-light-card dark:bg-dark-card p-4 border border-light-border dark:border-dark-border">
          <Text className="text-lg font-bold text-light-text dark:text-dark-text mb-4">
            Price Summary
          </Text>

          <PriceRow label="Court Rental Fee" value="$45.00" />
          <PriceRow label="Service Fee & Taxes" value="$5.85" />

          <Divider full />

          <PriceRow label="Total Amount" value="$50.85" bold />
        </View>
      </ScrollView>

      {/* ================= FOOTER ================= */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border">
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push("/book/courts/payment")}
          className="h-14 rounded-xl bg-primary items-center justify-center"
        >
          <Text className="text-black text-base font-medium">
            Confirm Booking
          </Text>
        </TouchableOpacity>
      </View>
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
