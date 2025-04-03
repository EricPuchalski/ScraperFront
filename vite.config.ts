import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    allowedHosts: ["488d-2803-9800-9544-89b1-9c24-a980-53ee-feb3.ngrok-free.app"]
  }
});