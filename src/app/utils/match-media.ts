"use client";

import { useEffect, useState } from "react";

const useMatchMedia = (query: string) => {
  const [match, setMatch] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    
    const handleChange = () => {
      setMatch(mediaQuery.matches);
    };
    
    // Set initial value
    setMatch(mediaQuery.matches);
    
    // Add listener
    mediaQuery.addEventListener("change", handleChange);
    
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return match;
};

export default useMatchMedia;
