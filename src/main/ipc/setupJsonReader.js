import fs from 'fs';
import { join } from 'path';
import { ipcMain } from 'electron';

export function setupJsonReader() {
  ipcMain.handle('read-json', async () => {
    const filePath = join(__dirname, '../../src/renderer/src/utils/alarms_config.json');
    console.log(filePath)
    try {
      const data = fs.readFileSync(filePath, 'utf8'); // Lê o arquivo JSON
      return JSON.parse(data); // Retorna os dados como objeto JSON
    } catch (error) {
      console.error('Erro ao ler o arquivo JSON:', error);
      throw error; // Lança o erro para o front-end tratar
    }
  });
}
