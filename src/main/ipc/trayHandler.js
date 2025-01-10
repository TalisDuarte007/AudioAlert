import { Tray, Menu } from 'electron';
import { join } from 'path';

let tray = null;

export function createTray(mainWindow, app) {
  tray = new Tray(join(__dirname, '../../resources/icon.ico')); // Caminho do ícone

  const trayMenu = Menu.buildFromTemplate([
    {
      label: 'Abrir',
      click: () => mainWindow.show(), // Mostra a janela principal
    },
    {
      label: 'Sair',
      click: () => {
        app.isQuiting = true; // Permite o encerramento do aplicativo
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(trayMenu);
  tray.setToolTip('Meu Aplicativo Electron');

  // Exibe a janela principal ao clicar no ícone da bandeja
  tray.on('click', () => mainWindow.show());

  return tray;
}
