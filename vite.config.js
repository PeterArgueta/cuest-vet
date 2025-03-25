import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/cuest-vet/", 
  plugins: [react()],
  json: {
    namedExports: true,
    stringify: false
  }
});
