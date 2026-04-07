import { getUserLocation } from "@/services/getLocation";
import { createContext, useContext, useEffect, useState } from "react";

type LocationContextType = {
  location: string;
  setLocation: (loc: string) => void;
};

const LocationContext = createContext<LocationContextType>({
  location: "Detecting location...",
  setLocation: () => {},
});

export const LocationProvider = ({ children }: any) => {
  const [location, setLocation] = useState("Detecting location...");

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
