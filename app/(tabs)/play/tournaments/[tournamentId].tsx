import ScreenWrapper from "@/components/ScreenWrapper";
import { useAuth } from "@/context/AuthContext";
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
        <ActivityIndicator size="large" color="#22C55E" />

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

  const { tournamentId } = useLocalSearchParams<{
    tournamentId: string;
  }>();

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [organiserName, setOrganiserName] = useState("");
  const [venue, setVenue] = useState<string | null>(null);

  const { isAuthenticated } = useAuth();

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

        setTitle(res.data.title);

        setOrganiserName(res.data.organiser?.fullname || "Smash Sports Club");

        setVenue(res.data.venue || null);

        setCreatedAt(res.data.createdAt || "");
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
  const timeline = [
    {
      title: "Entries Open",
      date: createdAt
        ? new Date(createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "02 May 2026",
    },
    {
      title: "Entries Close",
      date: "30 Jul 2026",
    },
    {
      title: "Tournament Starts",
      date: "05 Aug 2026",
    },
    {
      title: "Tournament Ends",
      date: "12 Aug 2026",
    },
  ];

  return (
    <ScreenWrapper>
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={iconColor} />
        </TouchableOpacity>

        <Text className="flex-1 ml-3 text-2xl font-bold text-light-text dark:text-dark-text">
          Tournament Details
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        {/* ================= HERO IMAGE ================= */}
        <View className="px-4 pt-2">
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDI1JNcsG-W_WgHuV-tS1TpKFaKQdajuyfvoFAOjG4zD8rpuyBc9BkmiP_J9m62MXoHVB0T1xS6rpqfz5-M13DkFU8vz9DDCba1VOCYTcaFGV8DexIAFVysNh4LPuy2NNc06NBYzxo9rAib-HbZ28cwEJzuggcbaAOk-Mc270Kt45HG7xRQyCOGcXcVwx1E1umlpJlRjWzRnwEhGhWVrlulgkF2ut0y6O1AAglDMnGp6FGAqoLW59aJoYGwgFQylz1ZCXjaqqtvw",
            }}
            className="w-full h-56 rounded-3xl"
            resizeMode="cover"
          />
        </View>

        {/* ================= TOURNAMENT INFO ================= */}
        <View className="px-4 pt-5">
          <Text className="text-3xl font-bold text-light-text dark:text-dark-text">
            {title}
          </Text>

          <Text className="mt-2 text-base font-bold text-light-text dark:text-dark-text">
            {organiserName}
          </Text>

          <View className="mt-4 flex-row items-center gap-2">
            <Ionicons name="location-outline" size={18} color={iconColor} />

            <Text className="flex-1 text-sm text-light-muted dark:text-dark-muted">
              {venue || "Venue will be announced soon"}
            </Text>
          </View>
        </View>

        {/* ================= TIMELINE ================= */}
        <View className="px-4 pt-8">
          <Text className="text-xl font-bold text-light-text dark:text-dark-text mb-6">
            Tournament Schedule
          </Text>

          <View className="">
            {timeline.map((item, index) => (
              <View key={item.title} className="flex-row">
                {/* LEFT TIMELINE */}
                <View className="items-center mr-4 mt-1">
                  <Ionicons
                    name={
                      item.title === "Entries Open"
                        ? "calendar-outline"
                        : item.title === "Entries Close"
                          ? "close-circle-outline"
                          : item.title === "Tournament Starts"
                            ? "play-outline"
                            : "trophy-outline"
                    }
                    size={18}
                    color="#22C55E"
                  />

                  {index !== timeline.length - 1 && (
                    <View className="w-[2px] flex-1 bg-primary/30 " />
                  )}
                </View>

                {/* CONTENT */}
                <View className="flex-1 pb-8">
                  <Text className="text-base font-bold text-light-text dark:text-dark-text">
                    {item.title}
                  </Text>

                  <Text className="mt-1 text-sm text-light-muted dark:text-dark-muted">
                    {item.date}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        {/* ================= CTA ================= */}
        <View className="px-4 pt-10 gap-3">
          <TouchableOpacity
            className="h-14 rounded-2xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card items-center justify-center"
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

          <TouchableOpacity
            className="h-14 rounded-2xl bg-primary items-center justify-center"
            onPress={() => {
              if (!isAuthenticated) {
                router.push("/(auth)/login");
                return;
              }

              router.push({
                pathname: "/play/tournaments/events",
                params: {
                  tournamentId: tournamentId,
                },
              });
            }}
          >
            <Text className="text-black text-base font-bold">
              {isAuthenticated ? "Register Now" : "Login to Register"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
