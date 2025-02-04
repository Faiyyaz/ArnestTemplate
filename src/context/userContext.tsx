// UserContext.tsx
import React, {createContext, useContext, ReactNode} from 'react';

interface UserContextType {}

// Create context with type
const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook to use UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Provider component
export const UserProvider = ({children}: {children: ReactNode}) => {
  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};
