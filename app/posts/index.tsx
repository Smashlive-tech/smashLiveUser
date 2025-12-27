import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* ================= MOCK API ================= */

const MOCK_USER_POSTS = [
  {
    id: "p1",
    userId: "u123",
    name: "Alex Runner",
    username: "@alexrunner",
    time: "2h ago",
    avatar: "https://i.pravatar.cc/100?img=12",
    text: "Crushed my personal best this morning! 💪🔥",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuABckBSoluEy9Y0Dj_1cMqgDeUiXJqCDKN0XUV2Krvj46Jf2KLNK8nWZSX2c_3OvQnpTyXZniLbiaynVeFdCyrQr821qD0LmCpHVV-Gz-MmUMyGQ358XLWxR98WGDp9-HZZTHt2plsDo_C_QTPHMCm113p-CFtuALAWBen1Pakfh9ySA2Yg1v8x7gzP581JSOwvlUJp2BRFx6AzvpRtuw6hvWmnGpT4rjskVeZ2IFowu0eJLHmfb7gv5kwFUwuHFXQ809cyOWNVLg",
    likes: 124,
    comments: 15,
  },
  {
    id: "p2",
    userId: "u123",
    name: "Alex Runner",
    username: "@alexrunner",
    time: "1d ago",
    avatar: "https://i.pravatar.cc/100?img=12",
    text: "Evening recovery run 🌅",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDy2DNJ44OeHXEb33B7mZRdJijFDREREwfNbsH1wmYR7R_HQkMDtxQBYyclNXB96YPWWm3ywJltMiECONYFiB8d0CBWII67_GtShoQSpUalEwXXc0BE4wBeFV4JgX95K5cQwU5dWKbjxjOxqsz71iTlzh999kyj3_2Ql-u8OIWCjw31m0LulVcxyVdk3VFlCYD4sBjDaji3-Z56UPMPJME4UunFS8I0akyPJ8Pu5Ld5cz8IxTZ1hAtyoOnfza7ZyAJKdveLvSMiEQ",
    likes: 88,
    comments: 9,
  },
];

/* ================= SCREEN ================= */

export default function UserPostFeedScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const { postId, userId } = useLocalSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<typeof MOCK_USER_POSTS>([]);

  /* ================= FETCH USER POSTS ================= */
  useEffect(() => {
    setTimeout(() => {
      // simulate: GET /users/:userId/posts
      const userPosts = MOCK_USER_POSTS.filter((p) => p.userId === userId);
      setPosts(userPosts);
      setIsLoading(false);
    }, 1000);
  }, [userId]);

  /* ================= ORDER POSTS ================= */
  const orderedPosts = useMemo(() => {
    if (!posts.length) return [];

    const selected = posts.find((p) => p.id === postId);
    const rest = posts.filter((p) => p.id !== postId);

    return selected ? [selected, ...rest] : posts;
  }, [posts, postId]);

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons
            name="arrow-back"
            size={22}
            color={isDark ? "#9ca3af" : "#6c757d"}
          />
        </TouchableOpacity>

        <Text className="text-xl font-bold text-text-primary dark:text-white">
          Posts
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4 pb-6">
          {/* ================= LOADING ================= */}
          {isLoading &&
            [1, 2].map((i) => (
              <View
                key={i}
                className="mb-4 rounded-xl bg-slate-200 dark:bg-slate-800 p-4"
              >
                <View className="h-4 w-32 bg-slate-300 dark:bg-slate-700 rounded mb-3" />
                <View className="h-40 bg-slate-300 dark:bg-slate-700 rounded" />
              </View>
            ))}

          {/* ================= EMPTY ================= */}
          {!isLoading && orderedPosts.length === 0 && (
            <View className="items-center mt-20">
              <Ionicons
                name="image-outline"
                size={48}
                color={isDark ? "#6b7280" : "#9ca3af"}
              />
              <Text className="text-text-secondary mt-3">
                No posts available
              </Text>
            </View>
          )}

          {/* ================= POSTS ================= */}
          {!isLoading &&
            orderedPosts.map((post) => (
              <View
                key={post.id}
                className="mb-5 rounded-xl bg-slate-100 dark:bg-slate-800 p-4"
              >
                {/* USER */}
                <View className="flex-row items-center gap-3 mb-3">
                  <Image
                    source={{ uri: post.avatar }}
                    className="w-11 h-11 rounded-full"
                  />
                  <View className="flex-1">
                    <Text className="font-bold text-text-primary dark:text-white">
                      {post.name}
                    </Text>
                    <Text className="text-sm text-text-secondary">
                      {post.username} · {post.time}
                    </Text>
                  </View>
                </View>

                {/* TEXT */}
                <Text className="text-base text-text-secondary mb-3">
                  {post.text}
                </Text>

                {/* IMAGE */}
                {post.image && (
                  <Image
                    source={{ uri: post.image }}
                    className="w-full h-64 rounded-lg mb-4"
                  />
                )}

                {/* ACTIONS */}
                <View className="flex-row justify-between">
                  <View className="flex-row gap-6">
                    <View className="flex-row items-center gap-1">
                      <Ionicons
                        name="heart-outline"
                        size={20}
                        color={isDark ? "#9ca3af" : "#6c757d"}
                      />
                      <Text className="text-sm text-text-secondary">
                        {post.likes}
                      </Text>
                    </View>

                    <View className="flex-row items-center gap-1">
                      <Ionicons
                        name="chatbubble-outline"
                        size={20}
                        color={isDark ? "#9ca3af" : "#6c757d"}
                      />
                      <Text className="text-sm text-text-secondary">
                        {post.comments}
                      </Text>
                    </View>
                  </View>

                  <Ionicons
                    name="share-social-outline"
                    size={20}
                    color={isDark ? "#9ca3af" : "#6c757d"}
                  />
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
