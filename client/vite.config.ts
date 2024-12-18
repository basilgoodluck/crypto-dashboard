import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => {

  return {
    server: {
      host: true,
      port: 5173,
    },
    plugins: [react(), tsconfigPaths()],
  };
});