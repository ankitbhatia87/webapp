import { ReactElement, useMemo, useState } from "react";

const useTypingText = (words: string[], speed: number): ReactElement => {
  const [wordToPrint, setWordToPrint] = useState<string>("");

  const getTextToPrint = () => {
    let letterIndex: number = 0;
    let _letters: string = "";
    let _wordIndex: number = 0;
    let _direction = "forward";
    const interval = setInterval(() => {
      if (_direction === "forward" && _wordIndex < words.length) {
        if (letterIndex < words[_wordIndex].length) {
          _letters = _letters + words[_wordIndex][letterIndex];
          setWordToPrint(_letters);
          letterIndex++;
        } else if (letterIndex === words[_wordIndex].length) {
          _direction = "backward";
        }
      }
      if (_direction === "backward" && _wordIndex < words.length) {
        if (letterIndex > 0) {
          _letters = _letters.slice(0, letterIndex - 1);
          setWordToPrint(_letters);
          letterIndex -= 1;
        } else if (letterIndex === 0) {
          _direction = "forward";
          _wordIndex++;
        }
      }

      if (_wordIndex === words.length) {
        clearInterval(interval);
        getTextToPrint();
      }
    }, speed);
  };

  useMemo(() => {
    getTextToPrint();
  }, []);

  return (
    <>
      {words.length > 0 && wordToPrint}
      <span className="animate-blink text-orange-400">_</span>
    </>
  );
};

export default useTypingText;
