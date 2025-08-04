'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of our context state
interface UserContextType {
  userName: string | null;
  setUserName: (name: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load username from localStorage when the app loads
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedName = localStorage.getItem('userName');
      if (savedName) {
        setUserName(savedName);
      }
      setIsLoading(false);
    }
  }, []);

  // Provide the state and setter to children
  const value = { userName, setUserName };

  if (isLoading) {
    // You can show a loader here if you want
    return null; 
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to easily access the user context
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}