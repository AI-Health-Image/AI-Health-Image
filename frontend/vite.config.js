import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
export default ({ mode }) => {
  // Lade die entsprechenden .env-Dateien basierend auf dem Mode (development oder production)
  const env = loadEnv(mode, processqq.cwd());
  return defineConfig({
    base: "/", // Wenn du auf einem Sub-Pfad bist
    build: {
      outDir: "dist",
    },
    plugins: [react(), tailwindcss()],
    define: {
      "process.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL),
    },
  });
};

