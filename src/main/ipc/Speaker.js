const Speaker = require('speaker'); // Para reproduzir o som no sistema
import fs from 'fs';

export function playAudio(audioPath) {
  if (!audioPath) {
    console.error('Erro: Nenhum caminho de áudio fornecido.');
    return;
  }

  console.log(`Caminho do áudio recebido: ${audioPath}`);

  // Verifica se o arquivo existe
  if (!fs.existsSync(audioPath)) {
    console.error('Arquivo de áudio não encontrado:', audioPath);
    return;
  }

  // Lê o arquivo MP3, decodifica e envia para o Speaker
  const stream = fs.createReadStream(audioPath);

  const speaker = new Speaker(); // Configura o Speaker
  stream.pipe(speaker).on('error', (err) => {
    console.error('Erro ao tocar o áudio:', err.message);
  });
}