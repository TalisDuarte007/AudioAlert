import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron';

export default defineConfig({
  plugins: [
    electron({
      main: {
        entry: 'src/main/index.js',
      },
      preload: {
        entry: 'src/preload/index.js',
      },
    }),
  ],
  build: {
    rollupOptions: {
      external: [
        'node-schedule', // Adicione aqui o módulo que deseja externalizar
        'fs',            // Exemplo de outros módulos Node.js que podem ser usados
        'path',
      ],
    },
  },
});
