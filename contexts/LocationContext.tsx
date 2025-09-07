import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

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

  // Hydrate from localStorage (web) on mount
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const savedStart = window.localStorage.getItem('startLocation');
        const savedEnd = window.localStorage.getItem('endLocation');
        if (savedStart) setStartLocationState(savedStart);
        if (savedEnd) setEndLocationState(savedEnd);
      }
    } catch {}
  }, []);

  const setStartLocation = (location: string) => {
    setStartLocationState(location);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('startLocation', location);
      }
    } catch {}
  };

  const setEndLocation = (location: string) => {
    setEndLocationState(location);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('endLocation', location);
      }
    } catch {}
  };

  const clearLocations = () => {
    setStartLocationState(null);
    setEndLocationState('Ujjain');
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem('startLocation');
        window.localStorage.setItem('endLocation', 'Ujjain');
      }
    } catch {}
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

