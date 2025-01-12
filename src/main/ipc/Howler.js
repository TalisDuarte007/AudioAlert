import { Howl } from 'howler';

export function playAudioInApp(audioPath) {
  console.log(`Tocando áudio no app: ${audioPath}`);

  const sound = new Howl({
    src: [`file://${audioPath}`], // Prefixo 'file://' para indicar caminho local
    html5: true, // Necessário para carregar arquivos locais e grandes
  });

  sound.play();
}
