import { User } from "interfaces/user";
import { useState, useEffect } from "react";

export default function useSearchHistory(): {
  searchHistory: Pick<User, "username" | "fullName">[];
  setSearchHistory: Function;
  clearHistory: () => void;
  addToHistory: (user: Pick<User, "username" | "fullName">) => void;
  removeFromHistory: (username: string) => void;
} {
  const [searchHistory, setSearchHistory] = useState<
    Pick<User, "username" | "fullName">[]
  >(JSON.parse(localStorage.getItem("h") || "[]"));

  useEffect(() => {
    if (searchHistory.length) {
      const users = searchHistory.map(({ username, fullName }) => ({
        username,
        fullName,
      }));

      localStorage.setItem("h", JSON.stringify(users));
    } else {
      localStorage.removeItem("h");
    }
  }, [searchHistory]);

  const removeFromHistory = (username: string) =>
    setSearchHistory(searchHistory.filter((e) => e.username !== username));

  const addToHistory = (user: Pick<User, "username" | "fullName">) => {
    if (!searchHistory.some((h) => h.username === user.username))
      setSearchHistory([user, ...searchHistory]);
  };

  const clearHistory = () => setSearchHistory([]);
  return {
    searchHistory,
    setSearchHistory,
    removeFromHistory,
    addToHistory,
    clearHistory,
  };
}
