import ScreenWrapper from "@/components/ScreenWrapper";
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

export default function TermsScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";

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
          Terms & Conditions
        </Text>
      </View>

      {/* ================= CONTENT ================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
      >
        <Text className="text-xl font-bold text-light-text dark:text-dark-text mb-4">
          Please read carefully
        </Text>

        <View className="rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-5">
          {/* Section 1 */}
          <Text className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
            1. Acceptance of Terms
          </Text>
          <Text className="text-base text-light-muted dark:text-dark-muted leading-relaxed mb-4">
            By creating an account and using this application, you agree to
            comply with and be bound by these Terms & Conditions. If you do not
            agree with any part of these terms, you may not use the app.
          </Text>

          {/* Section 2 */}
          <Text className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
            2. User Responsibilities
          </Text>
          <Text className="text-base text-light-muted dark:text-dark-muted leading-relaxed mb-4">
            • You must provide accurate information during sign-up.{"\n"}• You
            are responsible for safeguarding your account login credentials.
            {"\n"}• You agree not to misuse the app or engage in illegal
            activity using the platform.
          </Text>

          {/* Section 3 */}
          <Text className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
            3. Privacy & Data Usage
          </Text>
          <Text className="text-base text-light-muted dark:text-dark-muted leading-relaxed mb-4">
            We respect your privacy. Your personal information is collected only
            to improve app functionality and user experience. We do not sell or
            share your data with third parties unless required by law.
          </Text>

          {/* Section 4 */}
          <Text className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
            4. App Usage Rules
          </Text>
          <Text className="text-base text-light-muted dark:text-dark-muted leading-relaxed mb-4">
            • Do not attempt to harm or disrupt the platform.{"\n"}• Do not
            upload harmful, offensive, or illegal content.{"\n"}• We reserve the
            right to suspend accounts violating these rules.
          </Text>

          {/* Section 5 */}
          <Text className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
            5. Updates to Terms
          </Text>
          <Text className="text-base text-light-muted dark:text-dark-muted leading-relaxed mb-4">
            Terms & Conditions may be updated periodically. Continued use of the
            app after updates implies acceptance of revised terms.
          </Text>

          {/* Section 6 */}
          <Text className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
            6. Contact Us
          </Text>
          <Text className="text-base text-light-muted dark:text-dark-muted leading-relaxed mb-4">
            If you have any questions about these terms, feel free to reach out
            to our support team for clarification.
          </Text>

          <Text className="text-sm text-light-muted dark:text-dark-muted mt-4">
            Last updated: {new Date().getFullYear()}
          </Text>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
