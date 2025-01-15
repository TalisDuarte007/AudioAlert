import fs from 'fs';
import path, { join } from 'path'; // Certifique-se de importar `join` ou `path`

import { ipcMain } from 'electron';

export function setupJsonHandlers() {
  ipcMain.on('save-to-json', (event, time) => {
    const filePath = join(__dirname, '../../src/renderer/src/utils/alarms_config.json'); // Corrigir uso de `join`

    // Lê o JSON existente
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Erro ao ler o arquivo:', err);
        return;
      }

      try {
        const json = JSON.parse(data);

        // Adiciona o novo alarme ao array "alarms"
        json.alarms.push(time);

        let watchTimeout; // Variável para o temporizador

        // Escreve o JSON atualizado de volta ao arquivo
        fs.writeFile(filePath, JSON.stringify(json, null, 2), (err) => {
          if (err) {
            console.error('Erro ao salvar o arquivo:', err);
          } else {
            console.log('Alarme salvo com sucesso!');
          }
        });
      } catch (parseErr) {
        console.error('Erro ao interpretar o JSON:', parseErr);
      }
    });
  });
}
