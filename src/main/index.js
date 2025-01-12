import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import { setupJsonHandlers } from './ipc/jsonHandler';
import { setupDialogHandlers } from './ipc/dialogHandlers';
import { createTray } from './ipc/trayHandler'; // Importa o handler do Tray
import { setupJsonReader } from './ipc/setupJsonReader';
import { setupScheduler, setMainWindow } from './ipc/Scheduler'; // Importa setupScheduler e setMainWindow

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
    width: 800,
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
    minimizable: false, // Desabilita o botão de minimizar
    maximizable: false, // Desabilita o botão de maximizar
    resizable: false, // Bloqueia o redimensionamento da janela
  });

  // Quando a janela estiver pronta para ser exibida
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

  // Retorna a janela criada
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

  // Passa a referência da janela principal para o scheduler
  setMainWindow(mainWindow);

  // Configura os manipuladores de eventos
  setupJsonHandlers();
  setupJsonReader();
  setupDialogHandlers(mainWindow);
  setupScheduler(); // Inicializa o agendador de alarmes

  // Cria o Tray (bandeja de sistema)
  createTray(mainWindow, app);

  // Reativa o aplicativo no macOS quando não há janelas abertas
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  // Carrega a interface principal
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
});

// Fecha o aplicativo quando todas as janelas estão fechadas (exceto no macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Teste
ipcMain.on('ping', () => console.log('pong'));
