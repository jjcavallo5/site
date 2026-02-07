import { navigate } from "astro:transitions/client";

type Command = {
  help: string;
  run: () => void;
};

export const commands = new Map<string, Command>();

export const execute = (command: string) => {
  const cmd = commands.get(command);
  if (!cmd) return "Invalid command";
  console.log(cmd);
  cmd.run();
};

export const registerCommand = ({
  command,
  help,
  run,
}: {
  command: string;
  help: string;
  run: () => void;
}) => {
  console.log(command, help, run);
  commands.set(command, { help, run });
};

// Home Commands
for (const cmd of [
  "home",
  "clear",
  "/",
  "~",
  "cd home",
  "cd /",
  "cd ~",
  "cd",
  "1",
]) {
  commands.set(cmd, {
    help: "Go home",
    run: () => navigate("/"),
  });
}

// Blog Commands
for (const cmd of ["blog", "cd blog", "2"]) {
  commands.set(cmd, {
    help: "Go to blog screen",
    run: () => navigate("/blog"),
  });
}

// Project Commands
for (const cmd of ["projects", "cd projects", "3"]) {
  commands.set(cmd, {
    help: "Go to projects screen",
    run: () => navigate("/projects"),
  });
}

// Back commands
for (const cmd of ["cd ..", "back", "close"]) {
  commands.set(cmd, {
    help: "Go back",
    run: () => (history.length > 0 ? history.back() : null),
  });
}
