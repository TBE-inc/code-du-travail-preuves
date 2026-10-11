import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base : le site est servi sous /code-du-travail-preuves/ sur GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: "/code-du-travail-preuves/",
});
