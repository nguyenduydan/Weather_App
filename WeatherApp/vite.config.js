import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({

  plugins: [react(), tailwindcss()],
  resolve: {

  },
  server: {
    historyApiFallback: true,
    fs: {
      strict: false,
    }
  },
});
