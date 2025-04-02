import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    allowedHosts: ["6bc8-2803-9800-9544-89b1-c863-e70f-98d6-9585.ngrok-free.app"]
  }
});