import { Howl } from 'howler';

export function playAudioInApp(audioBase64) {
  console.log(`Tocando áudio com base64: ${audioBase64.substring(0, 50)}...`); // Log curto do base64

  const sound = new Howl({
    src: [audioBase64], // Fonte em Base64
    html5: true, // Necessário para arquivos grandes e locais
  });

  sound.on('load', () => {
    console.log('Áudio carregado com sucesso!');
    sound.play();
  });

  sound.on('play', () => {
    console.log('Áudio começou a tocar.');
  });

  sound.on('end', () => {
    console.log('Áudio terminou de tocar.');
  });

  sound.on('loaderror', (id, error) => {
    console.error('Erro ao carregar o áudio:', error);
  });

  sound.on('playerror', (id, error) => {
    console.error('Erro ao tocar o áudio:', error);
  });
}
