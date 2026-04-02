import * as Location from "expo-location";

/**
 * Get formatted location (city, country)
 */
export const getUserLocation = async (): Promise<string> => {
  try {
    /* ================= PERMISSION ================= */
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      return "Permission denied";
    }

    /* ================= GET LOCATION ================= */
    const loc = await Location.getCurrentPositionAsync({});

    /* ================= REVERSE GEOCODE ================= */
    const reverse = await Location.reverseGeocodeAsync({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });

    if (reverse.length > 0) {
      const place = reverse[0];

      const city = place.city || place.subregion || place.region || "Unknown";

      const country = place.country || "";

      return `${city}, ${country}`;
    }

    return "Location not found";
  } catch (err) {
    console.log(err);
    return "Error fetching location";
  }
};
