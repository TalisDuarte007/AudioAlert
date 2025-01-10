import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import { setupJsonHandlers } from './jsonHandler';
import { setupDialogHandlers } from './dialogHandlers';
import { createTray } from './ipc/trayHandler'; // Importa o handler do Tray

let mainWindow;

// Recarregamento automático para o processo principal (desenvolvimento apenas)
if (process.env.NODE_ENV === 'development') {
  try {
    require('electron-reloader')(module);
  } catch (err) {
    console.log('Error setting up reloader:', err);
  }
}

function createWindow() {
  // Criação da janela principal
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    icon: join(__dirname, "../../build/icon.ico"),
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  // Intercepta o evento de fechar para esconder a janela na bandeja
  mainWindow.on('close', (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.hide(); // Esconde a janela principal
    }
  });

  // Configura os manipuladores de eventos
  setupJsonHandlers();
  setupDialogHandlers(mainWindow);

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }

  // Intercept navigation in production to handle React routes
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith('http')) {
      event.preventDefault();
      mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
    }
  });

  // Intercept external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });

  return mainWindow;
}

// Inicialização do aplicativo
app.whenReady().then(() => {
  // Define o ID do modelo do aplicativo no Windows
  electronApp.setAppUserModelId('com.electron');

  // Gerencia atalhos de desenvolvimento
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // Cria a janela principal
  const mainWindow = createWindow();

  // Cria o Tray (bandeja de sistema)
  createTray(mainWindow, app);

  // Reativa o aplicativo no macOS quando não há janelas abertas
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Fecha o aplicativo quando todas as janelas estão fechadas (exceto no macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Teste
ipcMain.on('ping', () => console.log('pong'));
