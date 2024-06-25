// Import necessary dependencies
"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';


const student =
{
  id: '1',
  name: "sha7toot el naw",
  email: "sh7tt@gmail.com",
  password: "1234",
  followedTeachersIds: ["3mreda"],
  role: "student",
}


const teacher =
{
  id: "3mreda",
  name: "yousef",
  img: "/squidward.jpeg",
  role: "teacher",
}

// Create the UserContext
const UserContext = createContext();

// Custom hook to use the UserContext
export function useUserContext() {
  return useContext(UserContext);
}

// UserContextProvider component
export function UserContextProvider({ children }) {
  const [user, setUser] = useState({});

  const role = process.env.NEXT_PUBLIC_ROLE;

  useEffect(() => {
    if (role && role == 'teacher') setUser(teacher);
    if (role && role == 'student') setUser(student);

  }, [role]);

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
