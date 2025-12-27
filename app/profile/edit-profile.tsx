import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditProfileScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";

  /* ================= PROFILE STATE ================= */
  const [profilePic, setProfilePic] = useState(
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAcPal7e2uimTdT480kyNt_HOBPeB0sX_KAHU61BgTBW9hFDv4ZlaB7m7zoVIrdIClVZTKpWUvlEXOl4t-gW2T29k7ueHBXpxJPGGaAzB9XEuFCOYQ88Q6gzYOAFRrI5qOVSosAkP_bw9c2Cb7HGR6wHRtpyI_O88ThSHI_YYuQHRq-XMQJikMWwpKlGwGfVYdhC4rgQsQ8d8ybuyh6gDAXFTr6Ez776140TOIHu9iwDvSihh-lHF4Z-BQKtyiBsfLA7qMOhoOLDiOe"
  );

  const [fullName, setFullName] = useState("Alex Martinez");
  const [bio, setBio] = useState(
    "Tennis enthusiast · Weekend warrior · Looking for a hitting partner"
  );

  const [email, setEmail] = useState("alex.martinez@smashlive.com");
  const [phone, setPhone] = useState("(555) 123-4567");
  const [organization, setOrganization] = useState("SMASH LIVE Events");

  /* ================= IMAGE PICKER ================= */
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "We need access to your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  /* ================= SAVE ================= */
  const handleSave = () => {
    // 🔹 API call later
    Alert.alert(
      "Profile Updated",
      "Your changes have been saved successfully!"
    );
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#101622]">
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons
            name="arrow-back"
            size={22}
            color={isDark ? "#9ca3af" : "#6c757d"}
          />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-text-primary dark:text-white">
          Edit Profile
        </Text>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 80 }}
        >
          {/* ================= PROFILE PHOTO ================= */}
          <View className="items-center pt-8 pb-8">
            <TouchableOpacity onPress={pickImage} activeOpacity={0.85}>
              <Image
                source={{ uri: profilePic }}
                className="h-32 w-32 rounded-full"
              />
              <View className="absolute bottom-0 right-0 bg-[#0d59f2] rounded-full p-2">
                <MaterialIcons name="photo-camera" size={18} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>

          {/* ================= PUBLIC INFO ================= */}
          <View className="mb-4">
            <Text className="text-lg font-semibold text-text-primary dark:text-white">
              Profile Information
            </Text>
          </View>

          {/* Full Name */}
          <View className="mb-5">
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 pb-2">
              Display Name
            </Text>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              className="h-14 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-4 text-base text-gray-900 dark:text-gray-100"
            />
          </View>

          {/* Bio */}
          <View className="mb-1">
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 pb-2">
              Bio (Visible to others)
            </Text>
            <TextInput
              value={bio}
              onChangeText={setBio}
              multiline
              maxLength={150}
              placeholder="Tell people about yourself…"
              placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
              className="min-h-[100px] rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-4 py-3 text-base text-gray-900 dark:text-gray-100"
            />
            <Text className="text-xs text-gray-500 mt-1 text-right">
              {bio.length}/150
            </Text>
          </View>

          {/* ================= PRIVATE INFO ================= */}
          <View className="mb-4 mt-8">
            <Text className="text-lg font-semibold text-text-primary dark:text-white">
              Contact Information
            </Text>
          </View>

          {/* Email */}
          <View className="mb-5">
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 pb-2">
              Email
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              className="h-14 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-4 text-base text-gray-900 dark:text-gray-100"
            />
          </View>

          {/* Phone */}
          <View className="mb-5">
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 pb-2">
              Phone Number
            </Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              className="h-14 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-4 text-base text-gray-900 dark:text-gray-100"
            />
          </View>
        </ScrollView>

        {/* ================= ACTIONS ================= */}
        <View className="px-5 py-4 border-t border-gray-200 dark:border-gray-800">
          <TouchableOpacity
            onPress={handleSave}
            className="h-14 rounded-xl bg-[#0d59f2] items-center justify-center mb-3"
          >
            <Text className="text-white font-bold text-base">Save Changes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.back()}
            className="h-14 rounded-xl bg-gray-100 dark:bg-gray-800 items-center justify-center"
          >
            <Text className="text-gray-700 dark:text-gray-300 font-bold text-base">
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
