import { ipcMain, dialog } from 'electron';

export function setupDialogHandlers(mainWindow) {
    ipcMain.handle('dialog:openFile', async () => {
        const result = await dialog.showOpenDialog(mainWindow, {
            properties: ['openFile'],
            filters: [{ name: 'Audio Files', extensions: ['mp3'] }], // Apenas arquivos MP3
        });
        return result.filePaths[0]; // Retorna o caminho do arquivo selecionado
    });
}
