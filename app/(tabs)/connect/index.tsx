import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* ================= MOCK USER DATA ================= */

const USER = {
  name: "Sai",
  profilePic: "https://i.pravatar.cc/100?img=12",
};

/* ================= MOCK POSTS DATA ================= */

const POSTS = [
  {
    id: "1",
    name: "Alex Runner",
    username: "@alexrunner",
    time: "2h ago",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDy8lQlbn1oIfjJ_h0jnm7aY2-X3wE-VVaPO_XTYAzyuoLCF4cFnVbPUdKJWk0wAIx18-v_8KXrYmbej7z8Gi2tG95_5wvS_r3CTUinXCPNtJS9ZpufhIcG8VWTJnboD1PXQd59BlUcINjj9uufqJucvvk2GryRcxvylH15ERtzS9egt7FEi1biC079Ah-rocgAsvj0x7Q4TKi4LST7n7w-6pKryxA0G62tz9gRYGYun61S_Ng_VyPJ0Qb8tRfO0vv3nYCQTBDKKw",
    text: "Crushed my personal best this morning! The new trail at Sunrise Park is incredible. Who's up for a group run next weekend?",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBPcDFhsIZNFSldf08vHBoXqy6LAPRZB-qpg2jBLJFvnLmIdhGHBmsJhVX4ttc9OHWVEQYQk7HdVmgRT7KwcM_5GuxRMB8qj1FICZbVoQxhpD7XLoKuk66tanS3JxCw8vgxTYDy1uE1_N-iq5hBSbUHq-S_jAgb7CNh3W2jUk7pSAJOJzjYDFJSnI66v6KN5xe--jhsioZh9O4_9rEpBE2bZy0Vg7q_cWtclLkxxvpCB_BX9XyQ1AO7sNinNq-wVY87dgf3KWLvsQ",
    likes: 125,
    comments: 15,
    isLiked: false,
  },
  {
    id: "2",
    name: "Maria Ace",
    username: "@maria_ace",
    time: "5h ago",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA3G3yCqb10JUaMtM2MFuqRdaShVVQoGYylicbZ7q7pzzu30lLguYYRfuRB6QmZR1-NPRFf38y74d5B4R2-dljeLIT4qHaEjgEy7lpQwNkP7LOc8hxwZ0IH3PDF6cJxh0J-ffwoE9WeBoKHoYWJXGzMT2ii7Zlaqb8765g7g6iHnYTsNsx_of7aeiTN-WGeX0jUzNbdsBpjVPwW0RKkDQpqFOud5TdircKxHyAeHG_CDp5ByaNQVKyYbn8DlPhktbqMHFzCrM5Gmw",
    text: "Just booked a court for this weekend! Who's in for a game of tennis?",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDVlLEqwlmrjchsWapOdkR92agFPWtMk5s7ZSCCU-po0TcXuXZENNhgkPkjj9bCYbZqgPShAzgJW4Wb3ZKcRr260OHoeHF6hnZmxLgDNMqQPF9EMBUg5oU9lFYOojwBqQZNHFpvXHftkRZnVCnZnbmYlwDE0jONbaHdPftjCNnn1kj4zshwAB6xMXai6pXrkwrNTcgm9K9FT8vyijq0DE4OUybE6JA5EwkPDggIlg4h-_TBDAYUPS9hyaAsPYwK5u6vEG9B8mOdsQ",
    likes: 88,
    comments: 21,
    isLiked: false,
  },
];

/* ================= SCREEN ================= */

export default function ConnectScreen() {
  const isDark = useColorScheme() === "dark";
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<typeof POSTS>([]);

  /* ================= FETCH POSTS ================= */
  useEffect(() => {
    setTimeout(() => {
      setPosts(POSTS);
      setIsLoading(false);
    }, 1000);
  }, []);

  /* ================= LIKE HANDLER ================= */
  const toggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.name.toLowerCase().includes(query) ||
      post.username.toLowerCase().includes(query) ||
      post.text.toLowerCase().includes(query)
    );
  });

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      {/* HEADER */}
      <View className="flex-row items-center justify-between px-4 py-4">
        <Text className="text-2xl font-bold text-text-primary dark:text-white">
          Connect
        </Text>

        <TouchableOpacity onPress={() => router.push("/profile/[userId]")}>
          <Image
            source={{ uri: USER.profilePic }}
            className="h-8 w-8 rounded-full"
          />
        </TouchableOpacity>
      </View>

      {/* SEARCH */}
      <View className="px-4 pb-3">
        <View className="flex-row items-center h-12 rounded-lg bg-slate-200 dark:bg-slate-800 px-4">
          <Ionicons
            name="search"
            size={20}
            color={isDark ? "#9ca3af" : "#6c757d"}
          />
          <TextInput
            placeholder="Search posts, players, or clubs..."
            placeholderTextColor={isDark ? "#9ca3af" : "#6c757d"}
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-2 text-base text-text-primary dark:text-white"
          />
        </View>
      </View>

      {/* FEED */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4 pb-4">
          {!isLoading &&
            filteredPosts.map((post) => (
              <View
                key={post.id}
                className="mb-4 rounded-xl bg-slate-100 dark:bg-slate-800 p-4"
              >
                {/* USER */}
                <View className="flex-row items-center gap-3 mb-3">
                  <Image
                    source={{ uri: post.avatar }}
                    className="w-12 h-12 rounded-full"
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

                <Text className="text-base text-text-secondary mb-3">
                  {post.text}
                </Text>

                {post.image && (
                  <Image
                    source={{ uri: post.image }}
                    className="w-full h-48 rounded-lg mb-3"
                  />
                )}

                {/* ACTIONS */}
                <View className="flex-row justify-between">
                  <View className="flex-row gap-6">
                    {/* ❤️ LIKE */}
                    <TouchableOpacity
                      onPress={() => toggleLike(post.id)}
                      className="flex-row items-center gap-1"
                    >
                      <Ionicons
                        name={post.isLiked ? "heart" : "heart-outline"}
                        size={18}
                        color={
                          post.isLiked
                            ? "#ef4444"
                            : isDark
                              ? "#9ca3af"
                              : "#6c757d"
                        }
                      />
                      <Text className="text-sm text-text-secondary">
                        {post.likes}
                      </Text>
                    </TouchableOpacity>

                    {/* COMMENT (UI only for now) */}
                    <View className="flex-row items-center gap-1">
                      <Ionicons
                        name="chatbubble-outline"
                        size={18}
                        color={isDark ? "#9ca3af" : "#6c757d"}
                      />
                      <Text className="text-sm text-text-secondary">
                        {post.comments}
                      </Text>
                    </View>
                  </View>

                  <Ionicons
                    name="share-social-outline"
                    size={18}
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
