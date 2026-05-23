import { getUserLocation } from "@/services/getLocation";
import { createContext, useContext, useEffect, useState } from "react";

type SelectedLocation = {
  latitude: number;
  longitude: number;
  displayName: string;
  displayAddress?: string;
};

type LocationContextType = {
  location: SelectedLocation;

  setLocation: (loc: SelectedLocation) => void;
};

const defaultLocation: SelectedLocation = {
  latitude: 0,
  longitude: 0,
  displayName: "Detecting location...",
};
const LocationContext = createContext<LocationContextType>({
  location: defaultLocation,
  setLocation: () => {},
});

export const LocationProvider = ({ children }: any) => {
  const [location, setLocation] = useState<SelectedLocation>(defaultLocation);

  useEffect(() => {
    (async () => {
      const loc = await getUserLocation();
      setLocation(loc);
    })();
  }, []);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
