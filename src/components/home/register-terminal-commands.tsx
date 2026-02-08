import { useEffect } from "react";
import { registerCommand } from "@/lib/terminal";
import { navigate } from "astro:transitions/client";

type RegisterCommandProps = {
  commands?: {
    command: string;
    help: string;
    route: string;
    isExternal?: boolean;
  }[];
};

const RegisterTerminalCommands = ({ commands }: RegisterCommandProps) => {
  useEffect(() => {
    commands?.forEach((cmd) =>
      registerCommand({
        command: cmd.command,
        help: cmd.help,
        run: cmd.isExternal
          ? () => window.open(cmd.route, "_blank")
          : () => navigate(cmd.route),
      }),
    );
  }, [commands]);

  return null;
};

export default RegisterTerminalCommands;
