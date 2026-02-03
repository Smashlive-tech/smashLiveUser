import { useAuth } from "@/context/AuthContext";
import { checkAuth } from "@/services/authService";
import { Redirect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const { setUser } = useAuth();

  useEffect(() => {
    const init = async () => {
      try {
        const result = await checkAuth();
        if (result.authenticated) {
          setUser(result.user);
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (e) {
        setAuthenticated(false);
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    init();
  }, []);

  if (authenticated === null) return null;

  return authenticated ? (
    <Redirect href="/(tabs)/home"/>
  ) : (
    <Redirect href="/welcome"/>
  );
}
