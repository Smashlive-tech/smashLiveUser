import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const getAccessToken = async () => {
  return await SecureStore.getItemAsync("access_token");
};
export const removeAccessToken = async () => {
  await SecureStore.deleteItemAsync("access_token");
};
export const checkAuth = async () => {
  try {
    const token = await getAccessToken();
    console.log(token);
    if (!token) {
      return { authenticated: false };
    }

    const res = await axios.get(
      "https://smashlive-omega.vercel.app/api/users/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data);
    if (!res.data.user) {
      return { authenticated: false };
    }
    return {
      authenticated: true,
      user: res.data.user,
    };
  } catch (err: any) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      await SecureStore.deleteItemAsync("token");
    }

    return { authenticated: false };
  }
};
