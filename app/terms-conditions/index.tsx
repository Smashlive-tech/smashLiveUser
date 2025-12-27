import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TermsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white dark:bg-[#101622]">
      {/* ===== Header ===== */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons
            name="arrow-back"
            size={22}
            color={isDark ? "#9ca3af" : "#6c757d"}
          />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-text-primary dark:text-white">
          Terms & Conditions
        </Text>
      </View>

      {/* ===== Content ===== */}
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Please read carefully
          </Text>

          <View className="bg-white dark:bg-gray-800/60 rounded-xl shadow-sm p-5">
            {/* Section 1 */}
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              1. Acceptance of Terms
            </Text>
            <Text className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              By creating an account and using this application, you agree to
              comply with and be bound by these Terms & Conditions. If you do
              not agree with any part of these terms, you may not use the app.
            </Text>

            {/* Section 2 */}
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              2. User Responsibilities
            </Text>
            <Text className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              • You must provide accurate information during sign-up.{"\n"}• You
              are responsible for safeguarding your account login credentials.
              {"\n"}• You agree not to misuse the app or engage in illegal
              activity using the platform.
            </Text>

            {/* Section 3 */}
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              3. Privacy & Data Usage
            </Text>
            <Text className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              We respect your privacy. Your personal information is collected
              only to improve app functionality and user experience. We do not
              sell or share your data with third parties unless required by law.
            </Text>

            {/* Section 4 */}
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              4. App Usage Rules
            </Text>
            <Text className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              • Do not attempt to harm or disrupt the platform.{"\n"}• Do not
              upload harmful, offensive, or illegal content.{"\n"}• We reserve
              the right to suspend accounts violating these rules.
            </Text>

            {/* Section 5 */}
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              5. Updates to Terms
            </Text>
            <Text className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Terms & Conditions may be updated periodically. Continued use of
              the app after updates implies acceptance of revised terms.
            </Text>

            {/* Section 6 */}
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              6. Contact Us
            </Text>
            <Text className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              If you have any questions about these terms, feel free to reach
              out to our support team for clarification.
            </Text>

            <Text className="text-sm text-gray-500 dark:text-gray-500 mt-4">
              Last updated: {new Date().getFullYear()}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
