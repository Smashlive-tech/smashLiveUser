import ScreenWrapper from "@/components/ScreenWrapper";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

export default function RegisterTypeScreen() {
  const router = useRouter();
  const { eventId } = useLocalSearchParams();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";
  const { user } = useAuth();
  const eventIdNum = Number(eventId);

  const [loading, setLoading] = useState(false);

  return (
    <ScreenWrapper>
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center gap-3 px-4 py-4">
        <TouchableOpacity onPress={() => router.back()} disabled={loading}>
          <Ionicons name="arrow-back" size={24} color={iconColor} />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
          Play
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* ================= TITLE ================= */}
        <View className="px-4 pt-2 pb-6">
          <Text className="text-[22px] font-bold text-light-text dark:text-dark-text">
            Choose Registration Type
          </Text>
          <Text className="mt-1 text-sm text-light-muted dark:text-dark-muted leading-5">
            Select how you want to participate in this tournament
          </Text>
        </View>

        {/* ================= OPTIONS ================= */}
        <View className="px-4">
          <RegisterCard
            icon="person-outline"
            title="Play as Individual"
            subtitle="Register solo. Ideal for singles or solo events."
            onPress={async () => {
              if (loading) return;

              try {
                setLoading(true);

                await axios.post(
                  "https://smashlive-omega.vercel.app/api/registrations",
                  {
                    event: eventIdNum,
                    player: user?.id,
                  }
                );

                Alert.alert("Success", "Registered successfully");
              } catch (err: any) {
                if (axios.isAxiosError(err)) {
                  if (
                    err.response?.data?.errors?.[0]?.data?.errors?.[0]
                      ?.message === "Value must be unique"
                  ) {
                    Alert.alert(
                      "Already Registered",
                      "You are already registered for the tournament"
                    );
                  } else {
                    Alert.alert(
                      "Error",
                      "Registration failed. Please try again."
                    );
                  }
                } else {
                  Alert.alert("Error", "Something went wrong");
                }
              } finally {
                setLoading(false);
              }
            }}
          />
        </View>
      </ScrollView>

      {/* ================= LOADING OVERLAY ================= */}
      {loading && (
        <View className="absolute inset-0 items-center justify-center bg-black/30">
          <View className="rounded-xl bg-light-card dark:bg-dark-card px-6 py-5 items-center">
            <ActivityIndicator size="large" color="#8AFF1A" />
            <Text className="mt-3 text-sm text-light-muted dark:text-dark-muted">
              Registering for the event…
            </Text>
          </View>
        </View>
      )}
    </ScreenWrapper>
  );
}

/* ================= CARD COMPONENT ================= */

function RegisterCard({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: any;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      className="rounded-xl border border-light-border dark:border-dark-border p-4 mb-4 flex-row gap-4 bg-light-card dark:bg-dark-card"
    >
      {/* ICON */}
      <View className="h-12 w-12 rounded-lg items-center justify-center bg-primary/10">
        <Ionicons name={icon} size={24} color={iconColor} />
      </View>

      {/* TEXT */}
      <View className="flex-1 justify-center">
        <Text className="text-base font-bold text-light-text dark:text-dark-text">
          {title}
        </Text>
        <Text className="text-sm text-light-muted dark:text-dark-muted mt-1">
          {subtitle}
        </Text>
      </View>

      {/* ARROW */}
      <Ionicons
        name="chevron-forward"
        size={20}
        color={iconColor}
        style={{ alignSelf: "center" }}
      />
    </TouchableOpacity>
  );
}
