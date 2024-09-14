import { useEffect, useState } from "react";

const useMatchMedia = (query: string) => {
  const [match, setMatch] = useState<boolean>(false);

  const mediaQuery = window.matchMedia(query);

  mediaQuery.onchange = () => {
    setMatch(mediaQuery.matches);
  };

  useEffect(() => {
    setMatch(mediaQuery.matches);
  }, []);

  return match;
};

export default useMatchMedia;
