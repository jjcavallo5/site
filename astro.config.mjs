// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

import expressiveCode from "astro-expressive-code";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [
    react(),
    expressiveCode({
      themes: ["tokyo-night"],
      styleOverrides: {
        codeBackground: "#24273a",
        frames: {
          editorActiveTabBackground: "#24273a",
          terminalBackground: "#24273a",
          terminalTitlebarBackground: "#24273a",
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

  adapter: netlify(),
});

