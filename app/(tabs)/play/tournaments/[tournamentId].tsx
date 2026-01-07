import ScreenWrapper from "@/components/ScreenWrapper";
import { getAccessToken } from "@/services/authService";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
function TournamentDetailsSkeleton() {
  return (
    <ScreenWrapper>
      <View className="flex-1 items-center justify-center px-6">
        <ActivityIndicator size="large" color="#8AFF1A" />
        <Text className="mt-4 text-sm text-light-muted dark:text-dark-muted text-center">
          Loading tournament details…
        </Text>
      </View>
    </ScreenWrapper>
  );
}

export default function TournamentDetailsScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";
  const { tournamentId } = useLocalSearchParams<{ tournamentId: string }>();
  const [showDescription, setShowDescription] = useState(true);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [organiserName, setOrganiserName] = useState("");
  const [venue, setVenue] = useState<string | null>(null);

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        setLoading(true);
        const token = await getAccessToken();
        const res = await axios.get(
          `https://smashlive-omega.vercel.app/api/tournaments/${tournamentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data);
        setTitle(res.data.title);
        setOrganiserName(res.data.organiser?.fullname || "Smash Sports Club");
        setVenue(res.data.venue || null);
      } catch (err) {
        console.log("Failed to fetch tournament", err);
      } finally {
        setLoading(false);
      }
    };

    if (tournamentId) {
      fetchTournament();
    }
  }, [tournamentId]);

  if (loading) {
    return <TournamentDetailsSkeleton />;
  }

  return (
    <ScreenWrapper>
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={iconColor} />
        </TouchableOpacity>

        <Text className="flex-1 ml-3 text-2xl font-bold text-light-text dark:text-dark-text">
          Play
        </Text>

        <View className="flex-row gap-4">
          <TouchableOpacity onPress={() => router.push("/notifications")}>
            <MaterialIcons name="notifications" size={24} color={iconColor} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/play/bookings")}>
            <MaterialIcons name="calendar-month" size={24} color={iconColor} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ================= CONTENT ================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* ================= TOURNAMENT IDENTITY CARD ================= */}
        <View className="px-4 pt-2">
          <View className="rounded-3xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-4">
            {/* CREATOR + STATUS */}
            <View className="flex-row justify-between items-center mb-3">
              <View className="flex-row items-center gap-2">
                <View className="h-9 w-9 rounded-full bg-primary items-center justify-center">
                  <Text className="text-black font-bold text-base">
                    {organiserName?.charAt(0).toUpperCase() || "T"}
                  </Text>
                </View>
                <View>
                  <Text className="text-xs text-light-muted dark:text-dark-muted">
                    Created by
                  </Text>
                  <Text className="text-sm font-medium text-light-text dark:text-dark-text">
                    {organiserName}
                  </Text>
                </View>
              </View>

              {/* STATUS */}
              <View className="px-3 py-1 rounded-full bg-green-500/20">
                <Text className="text-xs font-semibold text-green-600">
                  Open
                </Text>
              </View>
            </View>

            {/* POSTER */}
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDI1JNcsG-W_WgHuV-tS1TpKFaKQdajuyfvoFAOjG4zD8rpuyBc9BkmiP_J9m62MXoHVB0T1xS6rpqfz5-M13DkFU8vz9DDCba1VOCYTcaFGV8DexIAFVysNh4LPuy2NNc06NBYzxo9rAib-HbZ28cwEJzuggcbaAOk-Mc270Kt45HG7xRQyCOGcXcVwx1E1umlpJlRjWzRnwEhGhWVrlulgkF2ut0y6O1AAglDMnGp6FGAqoLW59aJoYGwgFQylz1ZCXjaqqtvw",
              }}
              className="w-full h-44 rounded-2xl my-3"
              resizeMode="cover"
            />

            {/* DETAILS */}
            <Text className="text-xl font-bold text-light-text dark:text-dark-text">
              {title}
            </Text>

            <Text className="text-sm text-light-muted dark:text-dark-muted mt-1">
              🎾 Badminton • Doubles • Open
            </Text>

            <View className="mt-2 gap-1">
              <Text className="text-sm text-light-muted dark:text-dark-muted">
                📍 {venue || "TBD"}
              </Text>
              <Text className="text-sm text-light-muted dark:text-dark-muted">
                📅 Aug 5 – Aug 12, 2024
              </Text>
            </View>

            {/* PRICE */}
            <View className="mt-3 flex-row justify-between items-center">
              <Text className="text-sm text-light-muted dark:text-dark-muted">
                Entry Fee
              </Text>
              <Text className="text-lg font-bold text-light-text dark:text-dark-text">
                $50
              </Text>
            </View>
          </View>
        </View>

        {/* ================= DETAILS SECTIONS ================= */}
        <View className="px-4 pt-6 gap-4">
          {/* DESCRIPTION */}
          <DetailCard
            title="Description"
            open={showDescription}
            onToggle={() => setShowDescription(!showDescription)}
          >
            <Text className="pt-3 text-sm leading-6 text-light-muted dark:text-dark-muted">
              A detailed overview explaining the tournament format, rules,
              prizes, and participation details.
            </Text>
          </DetailCard>

          {/* SCHEDULE */}
          <DetailCard
            title="Schedule"
            open={showSchedule}
            onToggle={() => setShowSchedule(!showSchedule)}
          >
            <View className="pt-3 gap-2">
              {[
                ["Registration Deadline", "July 30, 2024"],
                ["Tournament Start", "August 5, 2024"],
                ["Finals", "August 12, 2024"],
              ].map(([label, value]) => (
                <View key={label} className="flex-row justify-between">
                  <Text className="text-sm text-light-muted dark:text-dark-muted">
                    {label}
                  </Text>
                  <Text className="text-sm font-medium text-light-text dark:text-dark-text">
                    {value}
                  </Text>
                </View>
              ))}
            </View>
          </DetailCard>

          {/* LOCATION (MAP CARD) */}
          <DetailCard
            title="Location"
            open={showLocation}
            onToggle={() => setShowLocation(!showLocation)}
          >
            <View className="pt-3 gap-3">
              <Text className="text-sm font-medium text-light-text dark:text-dark-text">
                City Sports Complex{"\n"}
                <Text className="font-normal text-light-muted dark:text-dark-muted">
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
          </DetailCard>
        </View>

        {/* ================= CTA ================= */}
        <View className="px-4 pt-8 gap-3">
          {/* VIEW TOURNAMENT */}
          <TouchableOpacity
            className="h-14 rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card items-center justify-center"
            onPress={() =>
              router.push({
                pathname: "/play/tournaments/eventDetails",
                params: {
                  tournamentId: tournamentId,
                },
              })
            }
          >
            <Text className="text-base font-semibold text-light-text dark:text-dark-text">
              View Tournament
            </Text>
          </TouchableOpacity>

          {/* REGISTER */}
          <TouchableOpacity
            className="h-14 rounded-xl bg-primary items-center justify-center"
            onPress={() =>
              router.push({
                pathname: "/play/tournaments/events",
                params: {
                  tournamentId: tournamentId, // replace `id` with your variable
                },
              })
            }
          >
            <Text className="text-black text-base font-bold">Register Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

/* ================= REUSABLE CARD ================= */

function DetailCard({ title, open, onToggle, children }: any) {
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";

  return (
    <View className="rounded-xl bg-light-card dark:bg-dark-card p-4 border border-light-border dark:border-dark-border">
      <TouchableOpacity
        onPress={onToggle}
        className="flex-row justify-between items-center"
      >
        <Text className="text-base font-semibold text-light-text dark:text-dark-text">
          {title}
        </Text>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={20}
          color={iconColor}
        />
      </TouchableOpacity>

      {open && children}
    </View>
  );
}
