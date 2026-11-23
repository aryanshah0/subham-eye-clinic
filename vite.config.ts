import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// BASE: "/" for the public launch (subhameyeclinic.pages.dev), "/subham-eye-clinic/" for the GitHub Pages staging copy.
export default defineConfig({
  base: process.env.BASE || "/",
  plugins: [react()],
  build: { manifest: true, sourcemap: false, cssCodeSplit: false },
  server: { port: 5190, host: "127.0.0.1" },
});
