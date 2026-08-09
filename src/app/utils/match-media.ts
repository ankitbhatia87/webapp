"use client";

import { useEffect, useState } from "react";

const useMatchMedia = (query: string) => {
  // Initialize from matchMedia if available (lazy initializer prevents setState inside effect)
  const getInitial = () => {
    if (typeof window === 'undefined') return false;
    try {
      return window.matchMedia(query).matches;
    } catch (e) {
      return false;
    }
  };

  const [match, setMatch] = useState<boolean>(getInitial);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia(query);

    const handleChange = (e: MediaQueryListEvent) => {
      setMatch(e.matches);
    };

    // Add listener
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return match;
};

export default useMatchMedia;
