import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

const LOGGED_IN_USER_ID = "u123";

/* ================= MOCK API ================= */

const MOCK_POSTS = [
  {
    id: "p1",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuABckBSoluEy9Y0Dj_1cMqgDeUiXJqCDKN0XUV2Krvj46Jf2KLNK8nWZSX2c_3OvQnpTyXZniLbiaynVeFdCyrQr821qD0LmCpHVV-Gz-MmUMyGQ358XLWxR98WGDp9-HZZTHt2plsDo_C_QTPHMCm113p-CFtuALAWBen1Pakfh9ySA2Yg1v8x7gzP581JSOwvlUJp2BRFx6AzvpRtuw6hvWmnGpT4rjskVeZ2IFowu0eJLHmfb7gv5kwFUwuHFXQ809cyOWNVLg",
  },
  {
    id: "p2",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDy2DNJ44OeHXEb33B7mZRdJijFDREREwfNbsH1wmYR7R_HQkMDtxQBYyclNXB96YPWWm3ywJltMiECONYFiB8d0CBWII67_GtShoQSpUalEwXXc0BE4wBeFV4JgX95K5cQwU5dWKbjxjOxqsz71iTlzh999kyj3_2Ql-u8OIWCjw31m0LulVcxyVdk3VFlCYD4sBjDaji3-Z56UPMPJME4UunFS8I0akyPJ8Pu5Ld5cz8IxTZ1hAtyoOnfza7ZyAJKdveLvSMiEQ",
  },
];

const MOCK_STATS = [
  {
    id: "s1",
    title: "Achievements",
    description: "🏆 Tournament Winner · 🥈 Runner-up · 🔥 20 Match Win Streak",
  },
  {
    id: "s2",
    title: "Activity Stats",
    description: "Matches Played: 124 · Win Rate: 68%",
  },
];

/* ================= SCREEN ================= */

export default function ProfileScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const { userId } = useLocalSearchParams();

  const profileUserId = LOGGED_IN_USER_ID;
  const isMyProfile = profileUserId === LOGGED_IN_USER_ID;

  const [activeTab, setActiveTab] = useState<"POSTS" | "STATS">("POSTS");
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<typeof MOCK_POSTS>([]);
  const [stats, setStats] = useState<typeof MOCK_STATS>([]);

  useEffect(() => {
    setTimeout(() => {
      setPosts(MOCK_POSTS);
      setStats(MOCK_STATS);
      setIsLoading(false);
    }, 1200);
  }, []);

  return (
    <ScreenWrapper>
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center px-4 py-4">
        {!isMyProfile && (
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Ionicons
              name="arrow-back"
              size={22}
              color={isDark ? "#9CA3AF" : "#6B7280"}
            />
          </TouchableOpacity>
        )}

        <Text className="flex-1 text-2xl font-bold text-light-text dark:text-dark-text">
          Profile
        </Text>

        {isMyProfile && (
          <TouchableOpacity onPress={() => router.push("/settings")}>
            <Ionicons
              name="settings-outline"
              size={22}
              color={isDark ? "#9CA3AF" : "#6B7280"}
            />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ================= TOP ================= */}
        <View className="flex-row px-4 pt-6 items-center">
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9qKDD0FCVRNkkJwFVCsvbD0nZGzHj7Au-2cl8sRnaaajgAPpYGXses26HOjJ-YWfrgZNydPnEPl3R4g0bCJJGipFWwAWYZUpfACzZT_EdGLldwgaVjRueJUpnVSAlNgtWt9IDf86gS5dlJ6lo5pgGbP7psvmT2xz-CN4vrmrmE9cqxFHo5x3tFe277Cq6UKJs9azkI2raGexDw0xACNosyhBR9qYPT1ldIq_v0o1M1ADg0O7plsxDFBFvIRUAkuKNFi-0bcXRwQ",
            }}
            className="h-24 w-24 rounded-full"
          />

          <View className="flex-1 flex-row justify-around ml-4">
            {[
              { label: "Posts", value: posts.length },
              { label: "Followers", value: "1.2k" },
              { label: "Following", value: "450" },
            ].map((item) => (
              <View key={item.label} className="items-center">
                <Text className="text-lg font-bold text-light-text dark:text-dark-text">
                  {item.value}
                </Text>
                <Text className="text-sm text-light-muted dark:text-dark-muted">
                  {item.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* ================= BIO ================= */}
        <View className="px-4 mt-4">
          <Text className="text-base font-bold text-light-text dark:text-dark-text">
            Alex Taylor
          </Text>
          <Text className="text-sm text-light-muted dark:text-dark-muted mt-1">
            Tennis enthusiast · Weekend warrior · Looking for a hitting partner
          </Text>
        </View>

        {/* ================= ACTION ================= */}
        <View className="flex-row gap-3 px-4 mt-5">
          {isMyProfile ? (
            <TouchableOpacity
              onPress={() => router.push("/profile/edit-profile")}
              className="flex-1 h-11 rounded-lg bg-primary items-center justify-center"
            >
              <Text className="text-black font-semibold text-sm">
                Edit Profile
              </Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity className="flex-1 h-11 rounded-lg bg-primary items-center justify-center">
                <Text className="text-white font-semibold text-sm">Follow</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 h-11 rounded-lg bg-light-card dark:bg-dark-card items-center justify-center">
                <Text className="text-light-text dark:text-dark-text font-semibold text-sm">
                  Message
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* ================= TABS ================= */}
        <View className="mt-8 border-b border-light-border dark:border-dark-border px-4">
          <View className="flex-row gap-8">
            {[
              { key: "POSTS", label: "Posts" },
              { key: "STATS", label: "Stats & Achievements" },
            ].map((tab) => (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(tab.key as any)}
                className={`pb-3 ${
                  activeTab === tab.key ? "border-b-[3px] border-primary" : ""
                }`}
              >
                <Text
                  className={`text-sm font-semibold ${
                    activeTab === tab.key
                      ? "text-primary"
                      : "text-light-muted dark:text-dark-muted"
                  }`}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ================= POSTS ================= */}
        {activeTab === "POSTS" && (
          <View className="px-4 mt-5 flex-row flex-wrap">
            {isLoading &&
              Array.from({ length: 6 }).map((_, i) => (
                <View key={i} className="w-1/3 aspect-square p-1">
                  <View className="w-full h-full rounded-lg bg-slate-200 dark:bg-slate-700" />
                </View>
              ))}

            {!isLoading &&
              posts.map((post) => (
                <TouchableOpacity
                  key={post.id}
                  onPress={() =>
                    router.push({
                      pathname: "/posts",
                      params: {
                        postId: post.id,
                        userId: profileUserId,
                      },
                    })
                  }
                  className="w-1/3 aspect-square p-1"
                >
                  <Image
                    source={{ uri: post.image }}
                    className="w-full h-full rounded-lg"
                  />
                </TouchableOpacity>
              ))}
          </View>
        )}

        {/* ================= STATS ================= */}
        {activeTab === "STATS" && (
          <View className="px-4 mt-6">
            {!isLoading &&
              stats.map((item) => (
                <View
                  key={item.id}
                  className="rounded-xl bg-light-card dark:bg-dark-card
                             border border-light-border dark:border-dark-border
                             p-4 mb-4"
                >
                  <Text className="font-semibold text-light-text dark:text-dark-text">
                    {item.title}
                  </Text>
                  <Text className="text-sm text-light-muted dark:text-dark-muted mt-2">
                    {item.description}
                  </Text>
                </View>
              ))}
          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}
