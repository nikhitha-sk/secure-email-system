"use client";

import { useEffect, useState } from "react";

const CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

interface DecryptTextProps {
  text: string;
}

export default function DecryptText({ text }: DecryptTextProps) {
  const [display, setDisplay] = useState<string>(
    // start with blanks or random chars
    Array(text.length)
      .fill("")
      .join("")
  );

  useEffect(() => {
    let reveal = 0;
    const len = text.length;

    const interval = setInterval(() => {
      reveal = Math.min(reveal + 1, len);
      const shown = text.slice(0, reveal);
      const rest = Array(len - reveal)
        .fill(null)
        .map(
          () => CHARSET[Math.floor(Math.random() * CHARSET.length)]
        )
        .join("");
      setDisplay(shown + rest);

      if (reveal === len) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text]);

  return <span className="font-mono">{display}</span>;
}
