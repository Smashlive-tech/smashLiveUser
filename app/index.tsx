import { useAuth } from "@/context/AuthContext";
import { checkAuth } from "@/services/authService";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const { setUser } = useAuth();

  useEffect(() => {
    const init = async () => {
      const result = await checkAuth();
      console.log(result.authenticated);
      if (result.authenticated) {
        setUser(result.user);
        setAuthenticated(true);
      }

      setLoading(false);
    };

    init();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return authenticated ? (
    <Redirect href="/(tabs)/home" />
  ) : (
    <Redirect href="/(auth)/login" />
  );
}
