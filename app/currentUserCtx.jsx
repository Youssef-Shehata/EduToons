// Import necessary dependencies
"use client"
import React, { createContext, useContext, useState } from 'react';

// Create the UserContext
const UserContext = createContext();

// Custom hook to use the UserContext
export function useUserContext() {
  return useContext(UserContext);
}

// UserContextProvider component
export function UserContextProvider({ children }) {
  const [user, setUser] = useState({});

  // Function to update the user state
  const updateUser = (newValue) => {
    setUser(newValue);
  };

  // Provide the UserContext with user state and updateUser function
  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}
