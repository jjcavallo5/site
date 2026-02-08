// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    expressiveCode({
      themes: ["tokyo-night"],
      styleOverrides: {
        codeBackground: "#24273a",
        frames: {
          editorActiveTabBackground: "#24273a",
          tooltipSuccessBackground: "#3d59a1",
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: "tokyo-night",
    },
  },
});

