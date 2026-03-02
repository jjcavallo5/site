import React, { useState, useEffect, useCallback } from "react";
import { execute } from "@/lib/terminal";

const helpCommands = [
  { cmd: "home", desc: "Go home" },
  { cmd: "blog", desc: "Go to blog" },
  { cmd: "projects", desc: "Go to projects" },
  { cmd: "back", desc: "Go back" },
  { cmd: "b<num>", desc: "Go to blog <num>" },
  { cmd: "p<num>", desc: "Go to project <num>" },
  { cmd: "refresh", desc: "Refresh page" },
  { cmd: "help", desc: "Show this help" },
];

const TerminalInput = () => {
  const [val, setVal] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const [helpVisible, setHelpVisible] = useState(false);

  const dismissHelp = useCallback(() => {
    setHelpVisible(false);
    setTimeout(() => setShowHelp(false), 500);
  }, []);

  useEffect(() => {
    const onShowHelp = () => {
      setShowHelp(true);
      requestAnimationFrame(() => setHelpVisible(true));

      const timer = setTimeout(dismissHelp, 15000);
      return () => clearTimeout(timer);
    };

    window.addEventListener("show-help", onShowHelp);
    return () => window.removeEventListener("show-help", onShowHelp);
  }, [dismissHelp]);

  const onSubmit = useCallback(() => {
    if (showHelp) dismissHelp();
    const error = execute(val);
    setVal("");
  }, [val, showHelp, dismissHelp]);

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

      if (key === "Escape" && showHelp) {
        dismissHelp();
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
  }, [onSubmit, showHelp, dismissHelp]);

  return (
    <>
      <div className="flex flex-row ml-2 items-center">
        <pre className="text-fg text-xl">{val}</pre>
        <div className="h-6 w-[12px] animate-blink bg-fg"></div>
        {val === "" && (
          <span className="text-fg-muted text-xl pointer-events-none select-none ml-2">
            Type 'help' to view commands
          </span>
        )}
      </div>

      {showHelp && (
        <div className="fixed bottom-25 left-5 z-50">
          <div
            onClick={dismissHelp}
            className="pointer-events-auto rounded-lg border border-light-gray px-6 py-4 font-mono text-sm shadow-lg"
            style={{
              backgroundColor: "rgba(26, 27, 38, 0.95)",
              transition: "opacity 0.5s ease",
              opacity: helpVisible ? 1 : 0,
            }}
          >
            <h3 className="text-teal font-bold mb-3 text-base">Commands</h3>
            <table
              className="border-separate"
              style={{ borderSpacing: "0 4px" }}
            >
              <tbody>
                {helpCommands.map(({ cmd, desc }) => (
                  <tr key={cmd}>
                    <td className="text-yellow pr-6">{cmd}</td>
                    <td className="text-fg-muted">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-fg-muted text-xs mt-3">
              Press Escape or click to dismiss
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default TerminalInput;
