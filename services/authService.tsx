import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const getAccessToken = async () => {
  return await SecureStore.getItemAsync("token");
};
export const removeAccessToken = async () => {
  await SecureStore.deleteItemAsync("token");
};
export const checkAuth = async () => {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { authenticated: false };
    }
    console.log(token);
    const res = await axios.get(
      "https://smashlive-omega.vercel.app/api/users/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.data.user) {
      await removeAccessToken();
      return { authenticated: false };
    }
    return {
      authenticated: true,
      user: res.data.user,
    };
  } catch (err: any) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      await removeAccessToken();
    }

    return { authenticated: false };
  }
};
