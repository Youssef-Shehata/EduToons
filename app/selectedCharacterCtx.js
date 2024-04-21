"use client"
import { createContext, useContext, useState } from 'react';

const data = [
  {
    value: "madara",
    label: "Uchiha Madara",
    img: "/characters/madara.jpeg"
  },
  {
    value: "petergriffen",
    label: "Peter Griffen",
    img: "/characters/petergriffen.jpeg"
  },
  {
    value: "ben10",
    label: "Ben 10",
    img: "/characters/ben10.jpeg"
  }, {
    value: "timon",
    label: "Timon",
    img: "/characters/timon.jpeg"
  }, {
    value: "eld7ee7",
    label: "الدحيح",
    img: "/characters/eld7ee7.jpeg"
  }, {
    value: "luigi",
    label: "Luigi",
    img: "/characters/luigi.jpeg"
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
