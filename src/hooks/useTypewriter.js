import { useState, useEffect } from "react";

export default function useTypewriter(words, { typeSpeed = 70, deleteSpeed = 40, pauseTime = 2500 } = {}) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    if (!isDeleting) {
      if (text.length < currentWord.length) {
        timeout = setTimeout(() => setText(currentWord.slice(0, text.length + 1)), typeSpeed);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      }
    } else if (text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), deleteSpeed);
    } else {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }, typeSpeed);
    }

    return () => clearTimeout(timeout);
  }, [text, wordIndex, isDeleting, words, typeSpeed, deleteSpeed, pauseTime]);

  return { text, isDeleting };
}
