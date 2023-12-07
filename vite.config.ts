import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.API_BASE_URL': JSON.stringify(env.VITE_API_BASE_URL)
    },
    plugins: [react(), tsconfigPaths()],
  }
})
