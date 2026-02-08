import React, { useState, useEffect } from "react";
import { execute } from "@/lib/terminal";
import { navigate } from "astro:transitions/client";

const validCommands = [
  "home",
  "/",
  "cd home",
  "cd /",
  "~",
  "cd ~",
  "cd blog",
  "blog",
  "cd projects",
  "projects",
  "1",
  "2",
  "3",
  "clear",
];

const TerminalInput = () => {
  const [val, setVal] = useState("");
  const [error, setError] = useState<string | undefined>();

  const onSubmit = () => {
    const error = execute(val);
    setError(error);
    setVal("");
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      e.preventDefault();
      const { key, ctrlKey, metaKey } = e;

      if ((ctrlKey || metaKey) && key.toLowerCase() === "u") {
        setVal("");
        return;
      }

      if (key === "Enter") {
        onSubmit();
        return;
      }

      if (key === "Backspace") {
        setVal((v) => v.slice(0, -1));
        return;
      }

      if (/^[a-zA-Z0-9~/ .]$/.test(key)) {
        setVal((v) => v + key);
        return;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [onSubmit]);

  return (
    <div className="flex flex-row ml-2">
      <pre className="text-fg text-xl">{val}</pre>
    </div>
  );
};

export default TerminalInput;
