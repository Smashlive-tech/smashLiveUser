import ScreenWrapper from "@/components/ScreenWrapper";
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

export default function EditProfileScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";

  /* ================= STATE ================= */
  const [profilePic, setProfilePic] = useState(
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAcPal7e2uimTdT480kyNt_HOBPeB0sX_KAHU61BgTBW9hFDv4ZlaB7m7zoVIrdIClVZTKpWUvlEXOl4t-gW2T29k7ueHBXpxJPGGaAzB9XEuFCOYQ88Q6gzYOAFRrI5qOVSosAkP_bw9c2Cb7HGR6wHRtpyI_O88ThSHI_YYuQHRq-XMQJikMWwpKlGwGfVYdhC4rgQsQ8d8ybuyh6gDAXFTr6Ez776140TOIHu9iwDvSihh-lHF4Z-BQKtyiBsfLA7qMOhoOLDiOe"
  );

  const [fullName, setFullName] = useState("Alex Martinez");
  const [bio, setBio] = useState(
    "Tennis enthusiast · Weekend warrior · Looking for a hitting partner"
  );
  const [email, setEmail] = useState("alex.martinez@smashlive.com");
  const [phone, setPhone] = useState("(555) 123-4567");

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
    Alert.alert("Profile Updated", "Your changes have been saved");
    router.back();
  };

  return (
    <ScreenWrapper>
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons
            name="arrow-back"
            size={22}
            color={isDark ? "#9CA3AF" : "#6B7280"}
          />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
          Edit Profile
        </Text>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
        >
          {/* ================= PROFILE IMAGE ================= */}
          <View className="items-center pt-8 pb-10">
            <TouchableOpacity onPress={pickImage} activeOpacity={0.85}>
              <Image
                source={{ uri: profilePic }}
                className="h-32 w-32 rounded-full"
              />

              <View className="absolute bottom-1 right-1 bg-primary rounded-full p-2">
                <MaterialIcons name="photo-camera" size={18} color="#000" />
              </View>
            </TouchableOpacity>
          </View>

          {/* ================= PROFILE INFO ================= */}
          <Section title="Profile Information" />

          <Field
            label="Display Name"
            value={fullName}
            onChangeText={setFullName}
          />

          <Field
            label="Bio"
            value={bio}
            onChangeText={setBio}
            multiline
            maxLength={150}
            footer={`${bio.length}/150`}
          />

          {/* ================= CONTACT ================= */}
          <Section title="Contact Information" />

          <Field
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Field
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </ScrollView>

        {/* ================= ACTIONS ================= */}
        <View className="px-4 py-4 border-t border-light-border dark:border-dark-border bg-transparent">
          <TouchableOpacity
            onPress={handleSave}
            className="h-14 rounded-xl bg-primary items-center justify-center mb-3"
          >
            <Text className="text-black font-bold text-base">Save Changes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.back()}
            className="h-14 rounded-xl bg-light-card dark:bg-dark-card items-center justify-center"
          >
            <Text className="text-light-text dark:text-dark-text font-bold text-base">
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

/* ================= REUSABLE ================= */

function Section({ title }: { title: string }) {
  return (
    <View className="mt-6 mb-3">
      <Text className="text-lg font-semibold text-light-text dark:text-dark-text">
        {title}
      </Text>
    </View>
  );
}

function Field({
  label,
  footer,
  ...props
}: {
  label: string;
  footer?: string;
  [key: string]: any;
}) {
  return (
    <View className="mb-5">
      <Text className="text-sm font-medium text-light-muted dark:text-dark-muted mb-2">
        {label}
      </Text>

      <TextInput
        {...props}
        placeholderTextColor="#9CA3AF"
        className="rounded-xl border border-light-border dark:border-dark-border
                   bg-light-card dark:bg-dark-card
                   px-4 py-3 text-base
                   text-light-text dark:text-dark-text"
      />

      {footer && (
        <Text className="text-xs text-light-muted dark:text-dark-muted mt-1 text-right">
          {footer}
        </Text>
      )}
    </View>
  );
}
