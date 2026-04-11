// import ScreenWrapper from "@/components/ScreenWrapper";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { useEffect, useState } from "react";
// import {
//   Image,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   useColorScheme,
// } from "react-native";

// /* ================= MOCK USER DATA ================= */

// const USER = {
//   name: "Sai",
//   profilePic: "https://i.pravatar.cc/100?img=12",
// };

// /* ================= MOCK POSTS DATA ================= */

// const POSTS = [
//   {
//     id: "1",
//     name: "Alex Runner",
//     username: "@alexrunner",
//     time: "2h ago",
//     avatar: "https://i.pravatar.cc/100?img=32",
//     text: "Crushed my personal best this morning! The new trail at Sunrise Park is incredible. Who's up for a group run next weekend?",
//     image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
//     likes: 125,
//     comments: 15,
//     isLiked: false,
//   },
//   {
//     id: "2",
//     name: "Maria Ace",
//     username: "@maria_ace",
//     time: "5h ago",
//     avatar: "https://i.pravatar.cc/100?img=47",
//     text: "Just booked a court for this weekend! Who's in for a game of tennis?",
//     image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
//     likes: 88,
//     comments: 21,
//     isLiked: false,
//   },
// ];

// /* ================= SCREEN ================= */

// export default function ConnectScreen() {
//   const router = useRouter();
//   const isDark = useColorScheme() === "dark";
//   const iconColor = isDark ? "#9CA3AF" : "#6B7280";

//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [posts, setPosts] = useState<typeof POSTS>([]);

//   useEffect(() => {
//     const t = setTimeout(() => {
//       setPosts(POSTS);
//       setLoading(false);
//     }, 900);
//     return () => clearTimeout(t);
//   }, []);

//   const toggleLike = (id: string) => {
//     setPosts((prev) =>
//       prev.map((p) =>
//         p.id === id
//           ? {
//               ...p,
//               isLiked: !p.isLiked,
//               likes: p.isLiked ? p.likes - 1 : p.likes + 1,
//             }
//           : p
//       )
//     );
//   };

//   const filteredPosts = posts.filter((p) => {
//     const q = searchQuery.toLowerCase();
//     return (
//       p.name.toLowerCase().includes(q) ||
//       p.username.toLowerCase().includes(q) ||
//       p.text.toLowerCase().includes(q)
//     );
//   });

//   return (
//     <ScreenWrapper>
//       {/* ================= HEADER ================= */}
//       <View className="flex-row items-center justify-between px-4 py-4">
//         <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
//           Connect
//         </Text>

//         <TouchableOpacity onPress={() => router.push("/profile/[userId]")}>
//           <Image
//             source={{ uri: USER.profilePic }}
//             className="h-9 w-9 rounded-full"
//           />
//         </TouchableOpacity>
//       </View>

//       {/* ================= SEARCH ================= */}
//       <View className="px-4 pb-3">
//         <View className="flex-row items-center h-12 rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border px-4">
//           <Ionicons name="search" size={20} color={iconColor} />
//           <TextInput
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//             placeholder="Search posts, players, clubs"
//             placeholderTextColor={iconColor}
//             className="flex-1 ml-2 text-base text-light-text dark:text-dark-text"
//           />
//         </View>
//       </View>

//       {/* ================= FEED ================= */}
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View className="px-4 pb-6">
//           {!loading &&
//             filteredPosts.map((post) => (
//               <View
//                 key={post.id}
//                 className="mb-4 rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-4"
//               >
//                 {/* USER */}
//                 <View className="flex-row items-center gap-3 mb-3">
//                   <Image
//                     source={{ uri: post.avatar }}
//                     className="w-11 h-11 rounded-full"
//                   />
//                   <View className="flex-1">
//                     <Text className="font-bold text-light-text dark:text-dark-text">
//                       {post.name}
//                     </Text>
//                     <Text className="text-sm text-light-muted dark:text-dark-muted">
//                       {post.username} · {post.time}
//                     </Text>
//                   </View>
//                 </View>

//                 {/* TEXT */}
//                 <Text className="text-base text-light-muted dark:text-dark-muted mb-3">
//                   {post.text}
//                 </Text>

//                 {/* IMAGE */}
//                 {post.image && (
//                   <Image
//                     source={{ uri: post.image }}
//                     className="w-full h-48 rounded-lg mb-3"
//                   />
//                 )}

//                 {/* ACTIONS */}
//                 <View className="flex-row justify-between">
//                   <View className="flex-row gap-6">
//                     {/* LIKE */}
//                     <TouchableOpacity
//                       onPress={() => toggleLike(post.id)}
//                       className="flex-row items-center gap-1"
//                     >
//                       <Ionicons
//                         name={post.isLiked ? "heart" : "heart-outline"}
//                         size={18}
//                         color={post.isLiked ? "#EF4444" : iconColor}
//                       />
//                       <Text className="text-sm text-light-muted dark:text-dark-muted">
//                         {post.likes}
//                       </Text>
//                     </TouchableOpacity>

//                     {/* COMMENT */}
//                     <View className="flex-row items-center gap-1">
//                       <Ionicons
//                         name="chatbubble-outline"
//                         size={18}
//                         color={iconColor}
//                       />
//                       <Text className="text-sm text-light-muted dark:text-dark-muted">
//                         {post.comments}
//                       </Text>
//                     </View>
//                   </View>

//                   <Ionicons
//                     name="share-social-outline"
//                     size={18}
//                     color={iconColor}
//                   />
//                 </View>
//               </View>
//             ))}
//         </View>
//       </ScrollView>
//     </ScreenWrapper>
//   );
// }
import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View, useColorScheme } from "react-native";

export default function SearchResultsScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";

  return (
    <ScreenWrapper>
      {/* HEADER */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={22} color={iconColor} />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
          Connect
        </Text>
      </View>

      {/* CONTENT */}
      <View className="flex-1 items-center justify-center px-6">
        <View className="h-24 w-24 rounded-full bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border items-center justify-center mb-6">
          <Ionicons name="construct-outline" size={40} color={iconColor} />
        </View>

        <Text className="text-lg font-semibold text-light-text dark:text-dark-text text-center">
          Coming Soon 🚀
        </Text>

        <Text className="text-sm text-light-muted dark:text-dark-muted mt-2 text-center">
          This feature is under development.
        </Text>
      </View>
    </ScreenWrapper>
  );
}
