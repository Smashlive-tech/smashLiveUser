import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TournamentDetailsScreen() {
  const isDark = useColorScheme() === "dark";
  const router = useRouter();
  const { tournamentId } = useLocalSearchParams();

  const [showDescription, setShowDescription] = useState(true);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showLocation, setShowLocation] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      {/* ================= TOP BAR ================= */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDark ? "#9ca3af" : "#6c757d"}
          />
        </TouchableOpacity>

        <Text className="flex-1 ml-3 text-2xl font-bold text-text-primary dark:text-white">
          Play
        </Text>

        <View className="flex-row gap-4">
          <TouchableOpacity onPress={() => router.push("/notifications")}>
            <MaterialIcons
              name="notifications"
              size={24}
              color={isDark ? "#9ca3af" : "#6c757d"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/play/bookings")}>
            <MaterialIcons
              name="calendar-month"
              size={24}
              color={isDark ? "#9ca3af" : "#6c757d"}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* ================= CONTENT ================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* IMAGE */}
        <View className="px-4 pt-2">
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDI1JNcsG-W_WgHuV-tS1TpKFaKQdajuyfvoFAOjG4zD8rpuyBc9BkmiP_J9m62MXoHVB0T1xS6rpqfz5-M13DkFU8vz9DDCba1VOCYTcaFGV8DexIAFVysNh4LPuy2NNc06NBYzxo9rAib-HbZ28cwEJzuggcbaAOk-Mc270Kt45HG7xRQyCOGcXcVwx1E1umlpJlRjWzRnwEhGhWVrlulgkF2ut0y6O1AAglDMnGp6FGAqoLW59aJoYGwgFQylz1ZCXjaqqtvw",
            }}
            className="w-full h-60 rounded-2xl"
            resizeMode="cover"
          />
        </View>

        {/* TITLE */}
        <Text className="px-4 pt-4 text-[30px] font-bold text-text-primary dark:text-white">
          Annual City Tennis Open 2024
        </Text>

        {/* CHIPS */}
        <View className="flex-row flex-wrap gap-2 px-4 pt-3">
          {["Tennis", "Singles & Doubles", "Intermediate Level"].map((chip) => (
            <View
              key={chip}
              className="px-3 py-1.5 rounded-full bg-slate-200 dark:bg-slate-800"
            >
              <Text className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                {chip}
              </Text>
            </View>
          ))}
        </View>

        {/* ================= DETAILS SECTIONS ================= */}
        <View className="px-4 pt-6 gap-4">
          {/* DESCRIPTION CARD */}
          <View className="rounded-xl bg-white dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-700">
            <TouchableOpacity
              onPress={() => setShowDescription(!showDescription)}
              className="flex-row items-center justify-between"
            >
              <Text className="text-base font-semibold text-text-primary dark:text-white">
                Description
              </Text>
              <Ionicons
                name={showDescription ? "chevron-up" : "chevron-down"}
                size={20}
                color={isDark ? "#9ca3af" : "#6c757d"}
              />
            </TouchableOpacity>

            {showDescription && (
              <Text className="pt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                A detailed overview explaining the tournament format, rules,
                prize money, and what participants can expect during the event.
              </Text>
            )}
          </View>

          {/* SCHEDULE CARD */}
          <View className="rounded-xl bg-white dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-700">
            <TouchableOpacity
              onPress={() => setShowSchedule(!showSchedule)}
              className="flex-row items-center justify-between"
            >
              <Text className="text-base font-semibold text-text-primary dark:text-white">
                Schedule
              </Text>
              <Ionicons
                name={showSchedule ? "chevron-up" : "chevron-down"}
                size={20}
                color={isDark ? "#9ca3af" : "#6c757d"}
              />
            </TouchableOpacity>

            {showSchedule && (
              <View className="pt-3 gap-2">
                {[
                  ["Registration Deadline", "July 30, 2024"],
                  ["Tournament Start", "August 5, 2024"],
                  ["Finals", "August 12, 2024"],
                ].map(([label, value]) => (
                  <View key={label} className="flex-row justify-between">
                    <Text className="text-sm text-slate-600 dark:text-slate-400">
                      {label}
                    </Text>
                    <Text className="text-sm font-medium text-text-primary dark:text-white">
                      {value}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* LOCATION CARD */}
          <View className="rounded-xl bg-white dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-700">
            <TouchableOpacity
              onPress={() => setShowLocation(!showLocation)}
              className="flex-row items-center justify-between"
            >
              <Text className="text-base font-semibold text-text-primary dark:text-white">
                Location
              </Text>
              <Ionicons
                name={showLocation ? "chevron-up" : "chevron-down"}
                size={20}
                color={isDark ? "#9ca3af" : "#6c757d"}
              />
            </TouchableOpacity>

            {showLocation && (
              <View className="pt-3 gap-3">
                <Text className="text-sm font-medium text-text-primary dark:text-white">
                  City Sports Complex{"\n"}
                  <Text className="font-normal text-slate-600 dark:text-slate-400">
                    123 Athletic Ave, Sportsville
                  </Text>
                </Text>

                <Image
                  source={{
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHmVCV_qxxzsrky6r9ZFPsMTq0oIUrKd-exTy1CiAUM8oqv87wdc7viKJECUMi8GKh9AAB_dj2qz8ONF__AUEVQIR2P9YoE6OGr2PRiYxHFpp4ShriNdhx2N_T4iaRgDzJuz3q_vscZ9OBjffhT98xjGKMnyskQWv4Lmmt5SFhgyniUti7plxkwe60hEx1YuM8yPPIQL8dIuNH0WPmQUSfttiq2U4S0UvnpxR9MvQ5LfmdL8mbVUb7hSwvnBQql7Xv9h4QjHi6dA",
                  }}
                  className="w-full h-40 rounded-lg"
                  resizeMode="cover"
                />
              </View>
            )}
          </View>
        </View>

        {/* ================= CTA INSIDE SCROLL ================= */}
        <View className="px-4 pt-8">
          <View className="flex-row justify-between mb-4">
            <Text className="text-base text-slate-600 dark:text-slate-400">
              Entry Fee
            </Text>
            <Text className="text-xl font-bold text-text-primary dark:text-white">
              $50.00
            </Text>
          </View>

          <TouchableOpacity
            className="h-14 rounded-xl bg-primary items-center justify-center mb-3"
            onPress={() => router.push("/play/tournaments/register")}
          >
            <Text className="text-white text-base font-bold">Register Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
