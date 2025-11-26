import { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import { usePoints } from '../hooks/usePoints';

const PointsContext = createContext(undefined);

export const PointsProvider = ({ children }) => {
  const { user, initializing } = useAuth();
  const value = usePoints(!initializing && !!user);
  return <PointsContext.Provider value={value}>{children}</PointsContext.Provider>;
};

export const usePointsContext = () => {
  const ctx = useContext(PointsContext);
  if (!ctx) {
    throw new Error('usePointsContext must be used within PointsProvider');
  }
  return ctx;
};
