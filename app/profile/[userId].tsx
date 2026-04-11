import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";

  const isMyProfile = true; // change later with auth

  const [activeTab, setActiveTab] = useState<"POSTS" | "STATS">("POSTS");

  const posts = [
    { id: "1", image: "https://picsum.photos/200" },
    { id: "2", image: "https://picsum.photos/201" },
    { id: "3", image: "https://picsum.photos/202" },
    { id: "4", image: "https://picsum.photos/203" },
    { id: "5", image: "https://picsum.photos/204" },
    { id: "6", image: "https://picsum.photos/205" },
  ];

  return (
    <ScreenWrapper>
      {/* HEADER */}
      <View className="flex-row items-center px-4 py-4">
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
            source={{ uri: "https://picsum.photos/300" }}
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
            Sai Nath
          </Text>
          <Text className="text-sm text-light-muted dark:text-dark-muted mt-1">
            Tennis enthusiast · Looking for partners 🎾
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
            {["POSTS", "STATS"].map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab as any)}
                className={`pb-3 ${
                  activeTab === tab ? "border-b-[3px] border-primary" : ""
                }`}
              >
                <Text
                  className={`text-sm font-semibold ${
                    activeTab === tab
                      ? "text-primary"
                      : "text-light-muted dark:text-dark-muted"
                  }`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ================= POSTS ================= */}
        {activeTab === "POSTS" && (
          <View className="px-2 mt-4 flex-row flex-wrap">
            {posts.map((post) => (
              <View key={post.id} className="w-1/3 aspect-square p-1">
                <Image
                  source={{ uri: post.image }}
                  className="w-full h-full rounded-lg"
                />
              </View>
            ))}
          </View>
        )}

        {/* ================= STATS ================= */}
        {activeTab === "STATS" && (
          <View className="px-4 mt-6">
            <View className="p-4 rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border mb-4">
              <Text className="font-semibold text-light-text dark:text-dark-text">
                Achievements
              </Text>
              <Text className="text-sm text-light-muted mt-2">
                🏆 Tournament Winner · 🥈 Runner-up
              </Text>
            </View>

            <View className="p-4 rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border">
              <Text className="font-semibold text-light-text dark:text-dark-text">
                Stats
              </Text>
              <Text className="text-sm text-light-muted mt-2">
                Matches: 120 · Win Rate: 65%
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}
