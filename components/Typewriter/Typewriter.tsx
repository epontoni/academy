"use client";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import styles from "./Typewriter.module.css";

type Props = {
  words: string[];
  className?: string;
};

export default function Typewriter({ words, className }: Props) {
  const [texts, setTexts] = useState<string[]>(words);
  const textRef = useRef<HTMLSpanElement>(null);

  // type one text in the typwriter
  // keeps calling itself until the text is finished
  const typeWriter = (text: string, i: number, fnCallback: () => void) => {
    // chekc if text isn't finished yet
    if (i < text.length) {
      console.log("TEXT: ", text);

      if (textRef.current != null) {
        // 👉️ TypeScript knows that ref is not null here
        // add next character to span
        textRef.current!.innerHTML =
          text.substring(0, i + 1) + '<span aria-hidden="true"></span>';
      }

      // wait for a while and call this function again for next character
      setTimeout(function () {
        typeWriter(text, i + 1, fnCallback);
      }, 100);
    }
    // text finished, call callback if there is a callback function
    else if (typeof fnCallback == "function") {
      // call callback after timeout
      setTimeout(fnCallback, 900);
    }
  };

  const StartTextAnimation = (i: number) => {
    if (typeof texts[i] == "undefined") {
      setTimeout(function () {
        StartTextAnimation(0);
      }, 20000);
    }
    // check if text[i] exists
    if (texts[i] && i < texts[i].length) {
      // text exists! start typewriter animation
      typeWriter(texts[i], 0, function () {
        // after callback (and whole text has been animated), start next text
        StartTextAnimation(i + 1);
      });
    }
  };

  useEffect(() => {
    StartTextAnimation(0);
  }, []);

  return (
    <span
      ref={textRef}
      className={cn(
        className,
        styles.typewriter,
        "text-xl lg:text-3xl text-indigo-500 underline"
      )}
    >
      Typewriter
    </span>
  );
}
