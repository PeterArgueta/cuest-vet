import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/cuestionario-veterinaria/", 
  plugins: [react()],
  json: {
    namedExports: true,
    stringify: false
  }
});
