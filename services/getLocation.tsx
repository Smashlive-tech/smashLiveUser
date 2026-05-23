import * as Location from "expo-location";

type SelectedLocation = {
  latitude: number;
  longitude: number;
  displayName: string;
  displayAddress?: string;
};

/**
 * Get formatted location
 */
export const getUserLocation = async (): Promise<SelectedLocation> => {
  try {
    /* ================= PERMISSION ================= */

    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      return {
        latitude: 0,
        longitude: 0,
        displayName: "Permission denied",
      };
    }

    /* ================= GET LOCATION ================= */

    const loc = await Location.getCurrentPositionAsync({});

    const latitude = loc.coords.latitude;

    const longitude = loc.coords.longitude;

    /* ================= REVERSE GEOCODE ================= */

    const reverse = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (reverse.length > 0) {
      const place = reverse[0];

      const city = place.city || place.subregion || place.region || "Unknown";

      const country = place.country || "";

      return {
        latitude,
        longitude,
        displayName: `${city}, ${country}`,
        displayAddress: `${city}, ${country}`,
      };
    }

    return {
      latitude,
      longitude,
      displayName: "Location not found",
    };
  } catch (err) {
    console.log(err);

    return {
      latitude: 0,
      longitude: 0,
      displayName: "Error fetching location",
    };
  }
};
