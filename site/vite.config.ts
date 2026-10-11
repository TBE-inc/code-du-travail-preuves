import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { readdirSync } from "node:fs";

const amendements = readdirSync(resolve(__dirname, "amendements"));
const constats = readdirSync(resolve(__dirname, "constats"));

// Site multipage servi sous /code-du-travail-preuves/ sur GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: "/code-du-travail-preuves/",
  build: {
    rollupOptions: {
      input: {
        accueil: resolve(__dirname, "index.html"),
        obligations: resolve(__dirname, "obligations/index.html"),
        entreprise: resolve(__dirname, "mon-entreprise/index.html"),
        pays: resolve(__dirname, "pays/index.html"),
        propositions: resolve(__dirname, "propositions/index.html"),
        methode: resolve(__dirname, "methode/index.html"),
        ...Object.fromEntries(constats.map((s) => [`constat-${s}`, resolve(__dirname, "constats", s, "index.html")])),
        ...Object.fromEntries(amendements.map((s) => [`amendement-${s}`, resolve(__dirname, "amendements", s, "index.html")])),
      },
    },
  },
});
