import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LocationContextType {
  startLocation: string | null;
  endLocation: string | null;
  setStartLocation: (location: string) => void;
  setEndLocation: (location: string) => void;
  clearLocations: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

interface LocationProviderProps {
  children: ReactNode;
}

export function LocationProvider({ children }: LocationProviderProps) {
  const [startLocation, setStartLocationState] = useState<string | null>(null);
  const [endLocation, setEndLocationState] = useState<string | null>('Ujjain');

  const setStartLocation = (location: string) => {
    setStartLocationState(location);
  };

  const setEndLocation = (location: string) => {
    setEndLocationState(location);
  };

  const clearLocations = () => {
    setStartLocationState(null);
    setEndLocationState('Ujjain');
  };

  return (
    <LocationContext.Provider
      value={{
        startLocation,
        endLocation,
        setStartLocation,
        setEndLocation,
        clearLocations,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}

