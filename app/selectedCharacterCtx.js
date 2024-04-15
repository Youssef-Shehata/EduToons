"use client"
import { createContext, useContext, useState } from 'react';

const data = [
  {
    value: "naruto",
    label: "Naruto",
    img: "/characters/Naruto.jpeg"
  },
  {
    value: "petergriffen",
    label: "Peter Griffen",
    img: "/characters/petergriffen.jpeg"
  }
];

const CharacterContext = createContext();
const CharactersContext = createContext();

export function useCharacterContext() {
  return useContext(CharacterContext);
}

export function useCharactersContext() {
  return useContext(CharactersContext);
}

export function CharacterContextProvider({ children }) {
  const [character, setCharacter] = useState(data[0]);

  const updateCharacter = (newValue) => {
    setCharacter(newValue);
  };

  return (
    <CharacterContext.Provider value={{ character, updateCharacter }}>
      {children}
    </CharacterContext.Provider>
  );
}

export function CharactersContextProvider({ children }) {
  const [characters, setCharacters] = useState(data);

  return (
    <CharactersContext.Provider value={{ characters, setCharacters }}>
      {children}
    </CharactersContext.Provider>
  );
}
